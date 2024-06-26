import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MDFiles, PagesService } from "../../../services/pages.service";
import { markdownToHTML } from "../../../util/markdownToHtml";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { makeExternalLinksOpenInNewTab } from "../../../util/makeExternalLinksOpenInNewTab";
import { sleep } from "../../../util/sleep";
import { CodeExample } from "../../../models/CodeExample";
import { observableToPromise } from "../../../util/obeservableToPromise";
import { CoreAppComponent } from "../../core/core-app.component";
import { UserDataService } from "../../../services/user-data.service";
import { TypeOfCodeInEditor } from "../../../models/TypeOfCodeInEditor";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Store } from "@ngrx/store";
import { Panel, UIState } from "../../../models/UIState";
import { MemoryDisplay, MemoryValueType } from "../../../models/MemoryDisplay";
import { UIStateInitialState } from "../../../stores/reducers/ui.state.reducer";
import { MemoryDisplayInitialState } from "../../../stores/reducers/memory-display.reducer";
import { UIStateActions } from "../../../stores/actions/ui.state.actions";
import { MemoryDisplayActions } from "../../../stores/actions/memory-display.actions";

interface DocumentationsParams {
  docId: string;
  tryIt: string | null;
}

@Component({
  selector: "app-documentation",
  templateUrl: "./documentation.component.html",
  styleUrls: ["./documentation.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("openClose", [
      state(
        "open",
        style({
          width: "100%",
          maxWidth: "100%",
          opacity: 1,
        })
      ),
      state(
        "closed",
        style({
          width: "0px",
          opacity: 0,
          overflow: "hidden",
        })
      ),
      transition("open => closed", [animate("0.3s")]),
      transition("* => open", [animate("0.3s")]),
      transition("closed => open", [animate("0.3s")]),
    ]),
  ],
})
export class DocumentationComponent implements AfterViewInit, OnDestroy {
  public static readonly IdStringForCodeBlocks = "exm_";
  content: SafeHtml | null = null;
  pagesNames: string[][] = [];
  codeExamples: CodeExample[] = [];
  nextPage: { link: string; description: string } | null = null;
  previousPage: { link: string; description: string } | null = null;

  @ViewChild("htmlDynamicContent") private htmlDynamicContent:
    | ElementRef
    | undefined;
  @ViewChild("coreAppComponent") private coreAppComponent:
    | CoreAppComponent
    | undefined;
  private readonly destroy$ = new Subject<void>();

  // @ts-ignore
  public readonly $docsParams: Observable<DocumentationsParams | null> =
    combineLatest([this.activeRoute.params, this.activeRoute.queryParams]).pipe(
      distinctUntilChanged(),
      map(([params, queryParams]) => {
        return {
          docId: params["docId"],
          tryIt: queryParams["tryIt"],
        };
      }),

      tap((params) =>
        this.loadContentAndTryIt(params["docId"], params["tryIt"])
      ),

      takeUntil(this.destroy$)
    );

  constructor(
    private pagesService: PagesService,
    private sanitizer: DomSanitizer,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private renderer: Renderer2,
    private codeEditorService: UserDataService,
    private store: Store<{
      count: number;
      uiState: UIState;
      memoryDisplay: MemoryDisplay;
    }>
  ) {
    this.getPagesNames().then();
  }

  static optionStringToAssemblerDisplay(optionsString: string): {
    uiState: UIState;
    memoryDisplay: MemoryDisplay;
  } {
    const uiState = structuredClone(UIStateInitialState);
    const memoryDisplay = structuredClone(MemoryDisplayInitialState);
    const allOptions = optionsString.split(" ");
    const panels: string[] = [];

    for (const option of allOptions) {
      const optionCommand = option.replace("-", "");
      switch (optionCommand) {
        case "console":
        case "memory":
        case "cpu":
          panels.push(option);
          break;
        case "number":
        case "ascii":
        case "binary":
        case "hex":
          memoryDisplay.valueType = option as MemoryValueType;
          break;
        case "word:1":
        case "word:2":
        case "word:4":
          memoryDisplay.wordSize = +option.replace("word:", "") as 1 | 2 | 4;
          break;
      }
    }
    const originalPanels = [...uiState.panels];
    const newPanels = panels.map((p, i) => {
      const newPanel: Panel = {
        name: p.replace("-", "") as "console" | "memory" | "cpu",
        order: i + 1,
        isVisible: !p.includes("-"),
      };
      return newPanel;
    });
    originalPanels.forEach((original) => {
      if (!newPanels.find((p) => p.name === original.name)) {
        newPanels.push(original);
      }
    });
    uiState.panels = newPanels.map((p, i) => ({ ...p, order: i + 1 }));
    return { uiState, memoryDisplay };
  }

  async getPagesNames() {
    this.pagesNames = await this.pagesService.getPagesNames();
  }

  async getContent(docId?: string): Promise<SafeHtml> {
    const content = await this.pagesService.getMarkdownText(docId || "");
    const rawHtml = markdownToHTML(content);
    const html = makeExternalLinksOpenInNewTab(rawHtml);

    const htmlWithButtons = html.replace(
      /class="code-block">/g,
      `class="code-block"><button class="run-code"> Try me</button> `
    );
    const sanitizedHtml: SafeHtml =
      this.sanitizer.bypassSecurityTrustHtml(htmlWithButtons);
    if (sanitizedHtml.toString() === "") {
      throw `no data was received from file ${MDFiles.Links}`;
    }
    return sanitizedHtml;
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  async navDocuments(event: Event, nav: "previous" | "next" | "closeTryIt") {
    switch (nav) {
      case "previous":
        await this.router.navigate(["docs", this.previousPage?.link]);
        break;
      case "next":
        await this.router.navigate(["docs", this.nextPage?.link]);
        break;
      case "closeTryIt":
        await this.router.navigate([], {
          relativeTo: this.activeRoute,
          queryParams: {
            ["tryIt"]: null,
          },
          queryParamsHandling: "merge",
        });

        break;
    }
  }

  replacePlus(async: string | null) {
    return async?.replace("+", " ");
  }

  setNextAndPrevious(docId: string) {
    const allDocIds = this.pagesNames.map((p) =>
      PagesService.NamePageToDocId(p)
    );
    const index = allDocIds.indexOf(docId);
    if (index + 1 < allDocIds.length) {
      let nextDocId = allDocIds[index + 1];
      this.nextPage = {
        link: nextDocId,
        description: this.replacePlus(nextDocId) || "",
      };
    } else {
      this.nextPage = null;
    }
    if (index > 0) {
      let nextDocId = allDocIds[index - 1];
      this.previousPage = {
        link: nextDocId,
        description: this.replacePlus(nextDocId) || "",
      };
    } else {
      this.previousPage = null;
    }
  }

  private async loadContentAndTryIt(docId: string, tryIt: string) {
    await this.loadDocumentsContent(docId, tryIt);
    this.setNextAndPrevious(docId);
    if (tryIt) {
      const codeExample = this.codeExamples.find((c) => c.codeId === tryIt);
      if (!codeExample?.code) return;

      this.codeEditorService.updateCodeEditor({
        code: codeExample.code,
        typeOfCode: TypeOfCodeInEditor.TryIt,
        savedCodeId: null,
      });
      // codeExample.optionsString
      const displayState =
        DocumentationComponent.optionStringToAssemblerDisplay(
          codeExample.optionsString
        );

      this.store.dispatch(
        UIStateActions.updateUIState({ ...displayState.uiState })
      );
      this.store.dispatch(
        MemoryDisplayActions.updateMemoryDisplay({
          ...displayState.memoryDisplay,
        })
      );
    } else {
      this.codeEditorService.clearRecordSelection();
      this.codeEditorService.hideRecordButtonOnNavBar();
    }
  }

  private async displayDocsContent() {
    const addTOC = false;
    let htmlTableOfContent = `
<div>

  <div>
    Welcome to the Assembly x86 emulator and tutorial! <br>
    This site is based on This project is based on
    <a href="https://github.com/Kobzol/davis "> https://github.com/Kobzol/davis  </a>.
    This tool allows writing, running and debugging x86 assembly in the browser.

    You can start with the tutorial in the basics section, learn how to use the emulator, or goto more advanced examples.

  </div>

</div>

`;
    if (addTOC) {
      htmlTableOfContent += `<h4>Table of content</h4>`;
      this.pagesNames.forEach((n) => {
        htmlTableOfContent += `<div><a href="#/docs/${PagesService.NamePageToDocId(
          n
        )}">
${n.join(" ")}
</a></div>`;
      });
    }

    const html = htmlTableOfContent;

    const sanitizedHtml: SafeHtml =
      this.sanitizer.bypassSecurityTrustHtml(html);
    if (sanitizedHtml.toString() === "") {
      throw `no data was received from file ${MDFiles.Links}`;
    }
    this.content = sanitizedHtml;
  }

  private async loadDocumentsContent(docId: string, tryIt: string) {
    if (!this.pagesNames.length) {
      await this.getPagesNames();
    }

    for (const page of this.pagesNames) {
      if (PagesService.NamePageToDocId(page) === docId) {
        const newContent = await this.getContent(docId);
        if (this.content?.toString() === newContent?.toString()) {
          return;
        }
        this.content = newContent;
        await sleep(300);
        await this.setupCodeExamples(docId);
        return;
      }
    }

    await this.displayDocsContent();
  }

  /**
   * Add event listeners to the buttons and saves the code tryIts
   * @private
   */
  private async setupCodeExamples(docId: string) {
    if (!this.htmlDynamicContent) {
      return;
    }
    const buttonElements: NodeListOf<HTMLButtonElement> =
      this.htmlDynamicContent.nativeElement.querySelectorAll("button.run-code");

    for (const btn of Array.from(buttonElements)) {
      this.renderer.listen(btn, "click", (evt) => {
        this.tryItButtonClicked(evt);
      });
    }
    const buttonWrapperElements: NodeListOf<HTMLDivElement> =
      this.htmlDynamicContent.nativeElement.querySelectorAll("div.code-block");
    let runNumber = 1;
    const codeSamples: CodeExample[] = [];
    for (const codeWrapper of Array.from(buttonWrapperElements)) {
      const spanWithData = codeWrapper.nextElementSibling;

      const codeId = `${
        DocumentationComponent.IdStringForCodeBlocks
      }${runNumber++}`;
      const dataComments = spanWithData?.getAttribute("data-comments") || "";
      const code = codeWrapper.querySelector("code")?.innerText || "";
      this.renderer.setAttribute(codeWrapper, "data-comments", dataComments);
      this.renderer.setProperty(codeWrapper, "id", codeId);
      codeSamples.push({ codeId, code, optionsString: dataComments, docId });
    }
    this.codeExamples = codeSamples;
  }

  private async tryItButtonClicked($event: MouseEvent) {
    const path = $event.composedPath();
    const codeBlock = path[1] as HTMLDivElement;
    const route = await observableToPromise(this.$docsParams);
    await this.router.navigate(["docs", route?.docId], {
      queryParams: {
        ["tryIt"]: codeBlock.id,
      },
    });
  }
}

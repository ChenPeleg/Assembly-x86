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
import { MarkdownToHtmlConverter } from "../../../util/markdown/markdownToHtmlConverter";
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
import { CodeExample } from "../../../models/CodeExample";
import { observableToPromise } from "../../../util/obeservableToPromise";
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
import { extractNumberFromFileName } from "../../../util/extractNumberFromFileName";
import { sleep } from "../../../util/sleep";
import { MarkdownCodes } from "../../../util/markdown/markdownCodes";
import { DocElement } from "../content-table/content-table.component";

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
  public static readonly IdStringForCodeBlocksPersist = "persist_";
  content: SafeHtml | null = null;
  pagesNames: string[][] = [];
  codeExamples: CodeExample[] = [];
  nextPage: { link: string; description: string } | null = null;
  previousPage: { link: string; description: string } | null = null;
  public tryItState: string = "";
  public isLoadingContent: boolean = false;
  @ViewChild("htmlDynamicContent") private htmlDynamicContent:
    | ElementRef
    | undefined;
  @ViewChild("documentationSection") private documentationSection:
    | ElementRef
    | undefined;
  @ViewChild("coreAppComponent") private coreAppComponent:
    | ElementRef
    | undefined;
  private readonly destroy$ = new Subject<void>();
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
        this.loadDocumentsContentAndTryIt(params["docId"], params["tryIt"])
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
    this.getPagesList().then();
    this.activeRoute.queryParams.subscribe((params) => {
      this.tryItState = params["tryIt"] || "";
    });
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
        case MarkdownCodes.console:
        case MarkdownCodes.memory:
        case MarkdownCodes.cpu:
          panels.push(option);
          break;
        case MarkdownCodes.number:
        case MarkdownCodes.ascii:
        case MarkdownCodes.binary:
        case MarkdownCodes.hex:
          memoryDisplay.valueType = option as MemoryValueType;
          break;
        case MarkdownCodes.word1:
        case MarkdownCodes.word2:
        case MarkdownCodes.word4:
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

  async getPagesList() {
    this.pagesNames = await this.pagesService.getPagesNames();
  }

  async getContent(docId?: string): Promise<SafeHtml> {
    const content = await this.pagesService.getMarkdownText(docId || "");

    const rawHtml = new MarkdownToHtmlConverter(content).html;
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
    const queryParams = {
      ["tryIt"]: this.tryItState
        ? DocumentationComponent.IdStringForCodeBlocksPersist
        : null,
    };

    switch (nav) {
      case "previous":
        await this.router.navigate(["docs", this.previousPage?.link], {
          queryParams,
        });
        break;
      case "next":
        await this.router.navigate(["docs", this.nextPage?.link], {
          queryParams,
        });
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

    if (nav === "previous" || nav === "next") {
      this.documentationSection?.nativeElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  createDockNameFromDocId(docId: string | null) {
    const fullPath = docId?.split("+") || [];
    const allNumbers = fullPath.map((n) => extractNumberFromFileName(n).number);
    const lastNode = fullPath[fullPath.length - 1];
    const firstNodeName = extractNumberFromFileName(fullPath[0]).text;
    const nodeNameText = extractNumberFromFileName(lastNode).text;
    return `${allNumbers.join(".")} ${firstNodeName} - ${nodeNameText}`;
  }

  setNextAndPrevious(docId: string) {
    const buildPage = (docId: string) => {
      return {
        link: docId,
        description: this.createDockNameFromDocId(docId) || "",
      };
    };
    const allDocIds = this.pagesNames.map((p) =>
      PagesService.NamePageToDocId(p)
    );

    const currentId = allDocIds.indexOf(docId);
    this.nextPage =
      (currentId + 1 < allDocIds.length &&
        buildPage(allDocIds[currentId + 1])) ||
      null;

    this.previousPage =
      currentId > 0 ? buildPage(allDocIds[currentId - 1]) : null;
  }

  contentTableItemClicked($event: DocElement) {
    this.documentationSection?.nativeElement.scrollIntoView({
      behavior: "smooth",
    });
  }

  private async displayDefaultDocsContent() {
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

  private async loadDocumentsContentAndTryIt(docId: string, tryIt: string) {
    await this.loadDocumentsContent(docId, tryIt);
    this.setNextAndPrevious(docId);
    if (tryIt) {
      await this.loadTryItToCodeEditor(docId, tryIt);
    } else {
      this.clearCodeEditorButtons();
    }
  }

  private async loadDocumentsContent(docId: string, tryIt: string) {
    this.isLoadingContent = true;
    try {
      if (!this.pagesNames.length) {
        await this.getPagesList();
      }
      const newContent = await this.loadDocumentContentFindDocument(docId);
      if (this.content?.toString() === newContent?.toString()) {
        return;
      }
      if (!newContent) {
        await this.displayDefaultDocsContent();
        return;
      }
      this.content = newContent;
      await sleep(300);
      await this.setupCodeExamples(docId);
    } finally {
      this.isLoadingContent = false;
    }
  }

  private async loadDocumentContentFindDocument(docId: string) {
    for (const page of this.pagesNames) {
      if (PagesService.NamePageToDocId(page) === docId) {
        return await this.getContent(docId);
      }
    }
    return null;
  }

  private async loadTryItToCodeEditor(docId: string, tryIt: string) {
    const codeExample = this.codeExamples.find((c) => c.codeId === tryIt);
    if (!codeExample?.code) return;

    this.codeEditorService.updateCodeEditor({
      code: codeExample.code,
      typeOfCode: TypeOfCodeInEditor.TryIt,
      savedCodeId: null,
    });
    const displayState = DocumentationComponent.optionStringToAssemblerDisplay(
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
  }

  private clearCodeEditorButtons() {
    this.codeEditorService.clearRecordSelection();
    this.codeEditorService.hideRecordButtonOnNavBar();
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
    this.coreAppComponent?.nativeElement.scrollIntoView({
      behavior: "smooth",
    });
  }
}

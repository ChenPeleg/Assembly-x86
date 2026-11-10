import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  DocTitles,
  MDFiles,
  PagesService,
} from "../../../services/pages.service";
import { MarkdownToHtmlConverter } from "../../../util/markdown/markdownToHtmlConverter";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  skip,
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
import { Panel, UIState } from "../../../models/UIState";
import { MemoryDisplay, MemoryValueType } from "../../../models/MemoryDisplay";
import {
  UIStateInitialState,
  UiStateStoreService,
} from "../../../services/ui-state-store.service";
import {
  MemoryDisplayInitialState,
  MemoryDisplayStoreService,
} from "../../../services/memory-display-store.service";
import { extractNumberFromFileName } from "../../../util/extractNumberFromFileName";
import { MarkdownCodes } from "../../../util/markdown/markdownCodes";
import { DocElement } from "../content-table/content-table.component";
import {
  DefaultDocsLanguage,
  DocsLanguage,
  DocsLanguageService,
} from "../../../services/docs-language.service";
import { DocsLabels, docsLabels } from "../../../services/docs-labels";

interface LoadedDocument {
  html: SafeHtml;
  /** The language actually loaded; English when a translation is missing. */
  language: DocsLanguage;
  codeExamples: CodeExample[];
}

interface DocumentationsParams {
  docId: string;
  tryIt: string | null;
}

@Component({
    selector: "app-documentation",
    templateUrl: "./documentation.component.html",
    styleUrls: ["./documentation.component.css"],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger("openClose", [
            state("open", style({
                width: "100%",
                maxWidth: "100%",
                opacity: 1,
            })),
            state("closed", style({
                width: "0px",
                opacity: 0,
                overflow: "hidden",
            })),
            transition("open => closed", [animate("0.3s")]),
            transition("* => open", [animate("0.3s")]),
            transition("closed => open", [animate("0.3s")]),
        ]),
    ],
    standalone: false
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
  /** Language of the page currently displayed (English when a translation is missing). */
  public contentLanguage: DocsLanguage = DefaultDocsLanguage;
  /** Translated titles for the header and table of contents ({} for English). */
  public docTitles: DocTitles = {};
  private currentDocId: string = "";
  private contentRequestId = 0;
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
    private uiStateStore: UiStateStoreService,
    private memoryDisplayStore: MemoryDisplayStoreService,
    private docsLanguageService: DocsLanguageService
  ) {
    this.getPagesList().then();
    this.activeRoute.queryParams.subscribe((params) => {
      this.tryItState = params["tryIt"] || "";
    });
    this.docsLanguageService.languageChanges
      .pipe(skip(1), takeUntil(this.destroy$))
      .subscribe(async () => {
        await this.loadDocumentsContent(this.currentDocId);
        this.setNextAndPrevious(this.currentDocId);
      });
  }

  get docsLanguage(): DocsLanguage {
    return this.docsLanguageService.language;
  }

  /** Labels of the docs view, in the selected documentation language. */
  get labels(): DocsLabels {
    return docsLabels(this.docsLanguage);
  }

  get isContentRtl(): boolean {
    return DocsLanguageService.isRtl(this.contentLanguage);
  }

  setDocsLanguage(language: DocsLanguage) {
    this.docsLanguageService.setLanguage(language);
  }

  /** The language toggle lives on the first documentation page (and the docs landing page). */
  showLanguageToggle(docId: string | null): boolean {
    if (!this.pagesNames.length) {
      return false;
    }
    const allDocIds = this.pagesNames.map((p) =>
      PagesService.NamePageToDocId(p)
    );
    return !docId || docId === allDocIds[0] || !allDocIds.includes(docId);
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

  async getContent(
    docId: string,
    language: DocsLanguage
  ): Promise<LoadedDocument> {
    const page = await this.pagesService.getMarkdownPage(docId, language);
    const converter = new MarkdownToHtmlConverter(page.text, docId);
    const rawHtml = converter.html;

    const html = makeExternalLinksOpenInNewTab(rawHtml);
    let runNumber = 1;
    // Follows the loaded page, so an English fallback page keeps English buttons.
    const tryMe = docsLabels(page.language).tryMe;

    const htmlWithButtons = html.replace(/class="code-block">/g, () => {
      const codeId = `${
        DocumentationComponent.IdStringForCodeBlocks
      }${runNumber++}`;
      return `class="code-block" id="${codeId}"><button class="run-code"> ${tryMe}</button> `;
    });

    const sanitizedHtml: SafeHtml =
      this.sanitizer.bypassSecurityTrustHtml(htmlWithButtons);
    if (sanitizedHtml.toString() === "") {
      throw `no data was received from file ${MDFiles.Links}`;
    }
    return {
      html: sanitizedHtml,
      language: page.language,
      codeExamples: converter.codeExamples,
    };
  }

  ngAfterViewInit() {
    this.listenToDynamicContentButtons();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  returnToDocs() {
    const tryItElement = this.tryItState
      ? document.getElementById(this.tryItState)
      : null;
    const target = tryItElement || this.documentationSection?.nativeElement;
    target?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
    const firstNodeName = PagesService.docTitle(
      fullPath.slice(0, 1),
      this.docTitles
    );
    const nodeNameText = PagesService.docTitle(fullPath, this.docTitles);
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
    const language = this.docsLanguageService.language;
    let htmlTableOfContent = `<div><div>${docsLabels(language).welcomeHtml}</div></div>`;
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
    this.contentLanguage = language;
    this.content = sanitizedHtml;
  }

  private async loadDocumentsContentAndTryIt(docId: string, tryIt: string) {
    this.currentDocId = docId;
    await this.loadDocumentsContent(docId);
    this.setNextAndPrevious(docId);
    if (tryIt) {
      await this.loadTryItToCodeEditor(docId, tryIt);
    } else {
      this.clearCodeEditorButtons();
    }
  }

  private async loadDocumentsContent(docId: string) {
    // Loads can overlap (e.g. the language is toggled while a page is loading);
    // only the most recent one may update the page.
    const requestId = ++this.contentRequestId;
    const isStale = () => requestId !== this.contentRequestId;
    this.isLoadingContent = true;
    try {
      if (!this.pagesNames.length) {
        await this.getPagesList();
      }
      const language = this.docsLanguageService.language;
      const titles = await this.pagesService.getDocTitles(language);
      const loaded = await this.loadDocumentContentFindDocument(docId, language);
      if (isStale()) {
        return;
      }
      this.docTitles = titles;
      if (!loaded) {
        await this.displayDefaultDocsContent();
        return;
      }
      this.contentLanguage = loaded.language;
      this.codeExamples = loaded.codeExamples;
      if (this.content?.toString() !== loaded.html.toString()) {
        this.content = loaded.html;
      }
    } finally {
      if (!isStale()) {
        this.isLoadingContent = false;
      }
    }
  }

  private async loadDocumentContentFindDocument(
    docId: string,
    language: DocsLanguage
  ) {
    for (const page of this.pagesNames) {
      if (PagesService.NamePageToDocId(page) === docId) {
        return await this.getContent(docId, language);
      }
    }
    return null;
  }
  private listenToDynamicContentButtons() {
    if (!this.htmlDynamicContent) {
      return;
    }
    this.renderer.listen(
      this.htmlDynamicContent.nativeElement,
      "click",
      (evt) => {
        this.tryItButtonClicked(evt).then();
      }
    );
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

    this.uiStateStore.updateUIState({ ...displayState.uiState });
    this.memoryDisplayStore.updateMemoryDisplay({
      ...displayState.memoryDisplay,
    });
  }
  private clearCodeEditorButtons() {
    this.codeEditorService.clearRecordSelection();
    this.codeEditorService.hideRecordButtonOnNavBar();
  }

  private async tryItButtonClicked($event: MouseEvent) {
    const button = ($event.target as HTMLElement).closest("button.run-code");
    if (!button) return;

    const codeBlock = button.closest(".code-block") as HTMLDivElement;
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

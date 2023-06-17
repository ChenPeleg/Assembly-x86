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
import { CodeEditorService } from "../../../services/codeEditor.service";
import { TypeOfCodeInEditor } from "../../../models/TypeOfCodeInEditor";

interface DocumentationsParams {
  docId: string;
  tryIt: string | null;
}

@Component({
  selector: "app-documentation",
  templateUrl: "./documentation.component.html",
  styleUrls: ["./documentation.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentationComponent implements AfterViewInit, OnDestroy {
  public static readonly IdStringForCodeBlocks = "exm_";
  content: SafeHtml | null = null;
  pagesNames: string[][] = [];
  codeExamples: CodeExample[] = [];

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
    private codeEditorService: CodeEditorService
  ) {
    this.getPagesNames().then();
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

  replacePlus(async: string | null) {
    return async?.replace("+", " ");
  }
  private async loadContentAndTryIt(docId: string, tryIt: string) {
    await this.loadDocumentsContent(docId, tryIt);
    if (tryIt) {
      const codeExample = this.codeExamples.find((c) => c.codeId === tryIt);
      if (!codeExample?.code) return;

      this.codeEditorService.updateCodeEditor({
        code: codeExample.code,
        typeOfCode: TypeOfCodeInEditor.TryIt,
        savedCodeId: null,
      });
    } else {
      this.codeEditorService.clearRecordSelection();
      this.codeEditorService.hideRecordButtonOnNavBar();
    }
  }
  private async displayDocsContent() {
    let htmlTableOfContent = `<h4>Table of content</h4>`;
    this.pagesNames.forEach((n) => {
      htmlTableOfContent += `<div><a href="#/docs/${PagesService.NamePageToDocId(
        n
      )}">
${n.join(" ")}
</a></div>`;
    });
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

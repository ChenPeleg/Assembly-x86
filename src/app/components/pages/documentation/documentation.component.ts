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
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { makeExternalLinksOpenInNewTab } from "../../../util/makeExternalLinksOpenInNewTab";
import { sleep } from "../../../util/sleep";

@Component({
  selector: "app-documentation",
  templateUrl: "./documentation.component.html",
  styleUrls: ["./documentation.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentationComponent implements AfterViewInit, OnDestroy {
  content: SafeHtml | null = null;
  pagesNames: string[][] = [];

  @ViewChild("htmlDynamicContent") private htmlDynamicContent:
    | ElementRef
    | undefined;
  private readonly destroy$ = new Subject<void>();
  public readonly docId: Observable<string | null> =
    this.activeRoute.params.pipe(
      distinctUntilChanged(),
      map((params) => params["docId"] ?? null),
      tap((params) => this.loadDocumentsContent(params)),
      takeUntil(this.destroy$)
    );

  constructor(
    private pagesService: PagesService,
    private sanitizer: DomSanitizer,
    private readonly activeRoute: ActivatedRoute,
    private renderer: Renderer2
  ) {
    this.getPagesNames().then();
    // this.docId.subscribe();
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

  private displayDocsContent() {
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

  private async loadDocumentsContent(docId: string) {
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
        await this.addEventListenersToButtons();
        return;
      }
    }

    this.displayDocsContent();
  }

  private async addEventListenersToButtons() {
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
    for (const codeWrapper of Array.from(buttonWrapperElements)) {
      const spanWithData = codeWrapper.nextElementSibling;
      if (!spanWithData) {
        return;
      }

      this.renderer.setAttribute(
        codeWrapper,
        "data-comments",
        spanWithData.getAttribute("data-comments") || ""
      );
    }
  }

  private tryItButtonClicked($event: MouseEvent) {
    console.log($event);
  }
}

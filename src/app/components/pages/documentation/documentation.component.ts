import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewEncapsulation,
} from "@angular/core";
import { MDFiles, PagesService } from "../../../services/pages.service";
import { markdownToHTML } from "../../../util/markdownToHtml";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { map, Observable, Subject, takeUntil, tap } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-documentation",
  templateUrl: "./documentation.component.html",
  styleUrls: ["./documentation.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentationComponent implements AfterViewInit, OnDestroy {
  content: SafeHtml | null = null;
  pagesNames: string[][] = [];
  private readonly destroy$ = new Subject<void>();
  public readonly docId: Observable<string | null> =
    this.activeRoute.params.pipe(
      map((params) => params["docId"] ?? null),
      tap((params) => this.loadDocsContent(params)),
      takeUntil(this.destroy$)
    );

  constructor(
    private pagesService: PagesService,
    private sanitizer: DomSanitizer,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.getPagesNames().then();
    this.docId.subscribe();
  }

  async getPagesNames() {
    this.pagesNames = await this.pagesService.getPagesNames();
  }

  async getContent(docId?: string): Promise<SafeHtml> {
    const content = await this.pagesService.getMarkdownText(docId || "");
    const html = markdownToHTML(content);
    const sanitizedHtml: SafeHtml =
      this.sanitizer.bypassSecurityTrustHtml(html);
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

  private async loadDocsContent(docId: string) {
    if (!this.pagesNames.length) {
      await this.getPagesNames();
    }
    for (const page of this.pagesNames) {
      if (PagesService.NamePageToDocId(page) === docId) {
        console.log(docId);
        this.getContent(docId).then((safeHtml) => (this.content = safeHtml));
        return;
      }
    }

    this.displayDocsContent();
  }
}

import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewEncapsulation,
} from "@angular/core";
import { MDFiles, PagesService } from "../../../services/pages.service";
import { markdownToHTML } from "../../../util/markdownToHtml";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { map, Observable, Subject, takeUntil } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-documentation",
  templateUrl: "./documentation.component.html",
  styleUrls: ["./documentation.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentationComponent implements AfterViewInit, OnDestroy {
  content: SafeHtml | null = null;
  private readonly destroy$ = new Subject<void>();
  public readonly docId: Observable<string | null> =
    this.activeRoute.params.pipe(
      map((params) => params["docId"] ?? null),
      takeUntil(this.destroy$)
    );

  constructor(
    private pagesService: PagesService,
    private sanitizer: DomSanitizer,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.getContent().then((safeHtml) => (this.content = safeHtml));
  }

  async getContent(): Promise<SafeHtml> {
    const content = await this.pagesService.getMarkdownText(MDFiles.Links);
    const html = markdownToHTML(content);
    const sanitizedHtml: SafeHtml =
      this.sanitizer.bypassSecurityTrustHtml(html);
    if (sanitizedHtml.toString() === "") {
      throw `no data was received from file ${MDFiles.Links}`;
    }
    console.log(html);
    return sanitizedHtml;
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}

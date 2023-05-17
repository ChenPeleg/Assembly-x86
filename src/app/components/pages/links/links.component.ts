import { AfterViewInit, Component, ViewEncapsulation } from "@angular/core";
import { MDFiles, PagesService } from "../../../services/pages.service";
import { markdownToHTML } from "../../../util/markdownToHtml";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-links",
  templateUrl: "./links.component.html",
  styleUrls: ["./links.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LinksComponent implements AfterViewInit {
  content: SafeHtml | null = null;

  constructor(
    private pagesService: PagesService,
    private sanitizer: DomSanitizer
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

    return sanitizedHtml;
  }

  ngAfterViewInit() {}
}

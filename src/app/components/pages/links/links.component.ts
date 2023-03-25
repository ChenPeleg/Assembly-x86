import { AfterViewInit, Component } from "@angular/core";
import { MDFiles, PagesService } from "../../../services/pages.service";

@Component({
  selector: "app-links",
  templateUrl: "./links.component.html",
  styleUrls: ["./links.component.scss"],
})
export class LinksComponent implements AfterViewInit {
  constructor(private pagesService: PagesService) {
    this.getContent().then((r) => r);
  }

  async getContent() {
    const content = await this.pagesService.getMarkdownText(MDFiles.Links);
    console.log(content);
  }

  ngAfterViewInit() {}
}

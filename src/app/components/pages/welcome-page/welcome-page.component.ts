import { AfterViewInit, Component, ViewEncapsulation } from "@angular/core";
import { PagesService } from "../../../services/pages.service";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-links",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class WelcomePageComponent implements AfterViewInit {
  content: SafeHtml | null = null;

  constructor(
    private pagesService: PagesService,
    private sanitizer: DomSanitizer
  ) {}

  ngAfterViewInit() {}
}

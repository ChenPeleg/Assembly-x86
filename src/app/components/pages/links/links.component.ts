import { AfterViewInit, Component } from "@angular/core";
import { PagesService } from "../../../services/pages.service";

@Component({
  selector: "app-links",
  templateUrl: "./links.component.html",
  styleUrls: ["./links.component.scss"],
})
export class LinksComponent implements AfterViewInit {
  constructor(private pagesService: PagesService) {}

  ngAfterViewInit() {}
}

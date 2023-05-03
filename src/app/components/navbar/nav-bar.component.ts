import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { PagesService } from "../../services/pages.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit() {}

  async clickLinks() {
    await this.router.navigate(["links/"]);
  }

  async clickDocs() {
    await this.router.navigate(["docs/"]);
  }
}

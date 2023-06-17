import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { CodeEditorService } from "../../services/codeEditor.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private codeEditorService: CodeEditorService
  ) {}

  ngAfterViewInit() {}

  async clickLinks() {
    await this.router.navigate(["links/"]);
  }
  async clickDemo() {
    await this.router.navigate(["demo/"]);
  }

  async clickDocs() {
    await this.router.navigate(["docs/"]);
  }
  async clickSave() {
    this.codeEditorService.saveCodeClicked();
  }
}

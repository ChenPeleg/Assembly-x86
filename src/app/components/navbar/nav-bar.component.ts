import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { UserDataService } from "../../services/user-data.service";
import { BehaviorSubject, Observable } from "rxjs";
import { sleep } from "../../util/sleep";
import { environment } from "../../../environments/environment";
import { PagesService } from "../../services/pages.service";

@Component({
    selector: "app-navbar",
    templateUrl: "./nav-bar.component.html",
    styleUrls: ["./nav-bar.component.css"],
    standalone: false
})
export class NavBarComponent implements AfterViewInit {
  public readonly $recordNameInEdit: Observable<string | null>;
  public readonly $codeRecordList: BehaviorSubject<
    { name: string; id: string }[]
  >;
  public readonly $showRecordButtons: BehaviorSubject<boolean>;
  public readonly hasSaves: boolean = environment.hasAppLinkSave;
  public recordName: string | null = null;
  public isRecordNameInEdit: boolean = false;
  public showSaveButtons: boolean = true;
  public isMenuOpen: boolean = false;
  @ViewChild("codeRecordRename") private codeRecordRenameInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  constructor(
    private router: Router,
    private codeEditorService: UserDataService,
    private userDataService: UserDataService,
    private pagesService: PagesService
  ) {
    this.$recordNameInEdit =
      this.codeEditorService.$currentEditRecordName.asObservable();
    this.$codeRecordList = this.codeEditorService.$currentRecordsList;
    this.$showRecordButtons = this.codeEditorService.$showRecordButtonOnNavBar;
    this.$recordNameInEdit.subscribe((name) => {
      if (!this.isRecordNameInEdit) {
        this.recordName = name;
      }
    });
    if (environment.hasAppLinkSave) {
      this.userDataService.$appUser.subscribe((user) => {
        this.showSaveButtons = !!user;
      });
    }
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    const menuContainer = document.getElementById("folder-menu-container");
    if (menuContainer && !menuContainer.contains(event.target as Node)) {
      this.isMenuOpen = false;
    }
  }

  ngAfterViewInit() {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async clickLinks() {
    await this.router.navigate(["links/"]);
  }

  async clickDemo() {
    await this.router.navigate(["demo/"]);
  }

  async clickDocs() {
    const firstDoc = this.pagesService.getFirstDocInTheDocumentsList();

    await this.router.navigate(["docs/", firstDoc]);
  }

  async clickSave() {
    this.codeEditorService.saveCodeClicked();
  }

  finishedEditRecordName($event: FocusEvent | Event) {
    this.isRecordNameInEdit = false;
    this.codeEditorService.renameCurrentCodeRecord(this.recordName || "");
  }

  async editNameClickHandler($event: MouseEvent) {
    this.isRecordNameInEdit = true;
    await sleep(20);
    this.codeRecordRenameInput?.nativeElement.focus();
  }

  calculateNameWidth(name: string | null) {
    return `${(name?.length || 10) * 12}px`;
  }

  recordClickHandler($event: MouseEvent, record: { name: string; id: string }) {
    this.isMenuOpen = false;
    this.codeEditorService.choseRecordClicked(record);
  }

  clickDelete() {
    this.codeEditorService.deleteCodeClicked();
  }

  newRecordClickHandler($event: MouseEvent) {
    this.isMenuOpen = false;
    this.codeEditorService.createNewCodeClicked();
  }
}

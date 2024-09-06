import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { getScreenMediaState } from "../../../util/screenMediaSatate";
import { debounceTime, Subject } from "rxjs";
import { Editor } from "brace";
import { UserDataService } from "../../../services/user-data.service";
import * as _ from "lodash";

const DEBUG_NO_EVENTS = true;

@Component({
  selector: "code-editor",
  templateUrl: "./code-editor.component.html",
  styleUrls: ["./code-editor.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CodeEditorComponent implements AfterViewInit {
  private static ACTIVE_LINE_CLASS: string = "active-line";

  public lastChar: string = "";
  public hideAssembleButton: boolean = true;
  public numberOfLines = 40;
  public isMobile: boolean = getScreenMediaState().isMobile;
  @Output() compile: EventEmitter<string> = new EventEmitter<string>();
  @Output() breakpointChange: EventEmitter<number[]> = new EventEmitter<
    number[]
  >();
  @Input("isTryIt") isTryIt: boolean = false;
  private readonly $editorChange: Subject<boolean> = new Subject<boolean>();
  private readonly $debouncedEditorChange = this.$editorChange.pipe(
    debounceTime(1000)
  );
  // @ts-ignore
  @ViewChild("editor") private legacyEditorRemove: ElementRef;
  // @ts-ignore
  private legacyAceEditor: Editor | null = null;

  constructor(private codeEditorService: UserDataService) {
    this.codeEditorService.$editorCodeUpdater.subscribe((change) => {
      this.legacyAceEditor?.session.getDocument().setValue(change.code);
    });
    this.$debouncedEditorChange.subscribe((change) => {
      // const newValue = this.aceEditor?.session.getValue();
      // this.numberOfLines = newValue?.split("\n").length || this.numberOfLines;
      // this.codeEditorService.updateCodeChangesTracker(newValue);
    });
  }

  private _breakpoints: number[] = [];

  get breakpoints(): number[] {
    return this._breakpoints;
  }
  get editorHeight() {
    const fives = Math.ceil((this.numberOfLines || 1) / 5) * 5;
    return this.isMobile ? { height: `${fives * 14}px` } : null;
  }

  // @ts-ignore
  private _activeLine: number = null;

  @Input() set activeLine(value: number) {
    if (DEBUG_NO_EVENTS) {
      return;
    }
    if (this.legacyAceEditor === null || this.legacyAceEditor) {
      return;
    }

    this.removeActiveLine();

    if (value !== null) {
      this._activeLine = value;
      this.legacyAceEditor.session.addGutterDecoration(
        value,
        CodeEditorComponent.ACTIVE_LINE_CLASS
      );
      this.legacyAceEditor.gotoLine(value + 1);
    }
  }

  ngAfterViewInit() {
    /** Old Legacy Code */
    // const el = this.legacyEditorRemove.nativeElement;
    // this.legacyAceEditor = ace.edit(el);
    //
    // this.legacyAceEditor.session.setMode("ace/mode/assembly_x86");
    // if (DEBUG_NO_EVENTS) {
    //   return;
    // }
    // this.legacyAceEditor.on("guttermousedown", (e: any) => {
    //   let target = e.domEvent.target;
    //   if (target.className.indexOf("ace_gutter-cell") === -1) {
    //     return;
    //   }
    //
    //   let row = e.getDocumentPosition().row;
    //   this.toggleBreakpoint(row);
    //   e.stop();
    // });
    // this.legacyAceEditor.on("change", (e: any) => {
    //   this.lastChar = e.lines[0];
    //   this.$editorChange.next(false);
    // });
  }

  public emitCompile() {
    this.compile.emit(this.legacyAceEditor?.getValue());
  }

  private toggleBreakpoint(row: number) {
    if (DEBUG_NO_EVENTS) {
      return;
    }
    if (this.hasBreakpoint(row)) {
      this.legacyAceEditor?.session.clearBreakpoint(row);
      _.remove(this._breakpoints, (value: number) => value === row);
    } else {
      this.legacyAceEditor?.session.setBreakpoint(row, "ace_breakpoint");
      this._breakpoints.push(row);
    }

    this.breakpointChange.emit(this._breakpoints);
  }

  private hasBreakpoint(row: number): boolean {
    return _.includes(this._breakpoints, row);
  }

  private removeActiveLine() {
    if (DEBUG_NO_EVENTS) {
      return;
    }
    if (this._activeLine !== -1 && !this.legacyAceEditor) {
      this.legacyAceEditor?.session.removeGutterDecoration(
        this._activeLine,
        CodeEditorComponent.ACTIVE_LINE_CLASS
      );
    }
  }
}

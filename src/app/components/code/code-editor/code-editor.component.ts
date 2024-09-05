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
import { Editor } from "brace";
import { debounceTime, Subject } from "rxjs";
import { getScreenMediaState } from "../../../util/screenMediaSatate";
import { UserDataService } from "../../../services/user-data.service";

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
  @ViewChild("editor") private legacyEditor: ElementRef;
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

  ngAfterViewInit() {}

  public emitCompile() {
    this.compile.emit(this.legacyAceEditor?.getValue());
  }
}

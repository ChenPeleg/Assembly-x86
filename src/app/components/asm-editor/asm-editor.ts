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
import * as _ from "lodash";
import * as ace from "brace";
import { Editor } from "brace";
import { debounceTime, Subject } from "rxjs";
import { CodeEditorService } from "../../services/codeEditor.service";

// @ts-ignore
ace.config.set("modePath", "./assets/js");

@Component({
  selector: "asm-editor",
  templateUrl: "./asm-editor.html",
  styleUrls: ["./asm-editor.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AsmEditorComponent implements AfterViewInit {
  private static ACTIVE_LINE_CLASS: string = "active-line";
  public hideAssembleButton: boolean = true;
  public numberOfLines = 40;
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
  @ViewChild("editor") private editor: ElementRef;
  private aceEditor: Editor | null = null;

  constructor(private codeEditorService: CodeEditorService) {
    this.codeEditorService.$editorCodeUpdater.subscribe((change) => {
      this.aceEditor?.session.getDocument().setValue(change.code);
    });
    this.$debouncedEditorChange.subscribe((change) => {
      const newValue = this.aceEditor?.session.getValue();
      this.numberOfLines = newValue?.split("\n").length || this.numberOfLines;
      this.codeEditorService.updateCodeChangesTracker(newValue);
    });
  }

  private _breakpoints: number[] = [];

  get breakpoints(): number[] {
    return this._breakpoints;
  }
  get editorHeight(): string {
    const fives = Math.ceil((this.numberOfLines || 1) / 5) * 5;
    return `${fives * 16}px`;
  }

  // @ts-ignore
  private _activeLine: number = null;

  @Input() set activeLine(value: number) {
    if (this.aceEditor === null) {
      return;
    }

    this.removeActiveLine();

    if (value !== null) {
      this._activeLine = value;
      this.aceEditor.session.addGutterDecoration(
        value,
        AsmEditorComponent.ACTIVE_LINE_CLASS
      );
      this.aceEditor.gotoLine(value + 1);
    }
  }

  ngAfterViewInit() {
    const el = this.editor.nativeElement;
    this.aceEditor = ace.edit(el);

    this.aceEditor.session.setMode("ace/mode/assembly_x86");
    this.aceEditor.on("guttermousedown", (e: any) => {
      let target = e.domEvent.target;
      if (target.className.indexOf("ace_gutter-cell") === -1) {
        return;
      }

      let row = e.getDocumentPosition().row;
      this.toggleBreakpoint(row);
      e.stop();
    });
    this.aceEditor.on("change", (e: any) => {
      this.$editorChange.next(false);
    });
  }

  public emitCompile() {
    this.compile.emit(this.aceEditor?.getValue());
  }

  private toggleBreakpoint(row: number) {
    if (this.hasBreakpoint(row)) {
      this.aceEditor?.session.clearBreakpoint(row);
      _.remove(this._breakpoints, (value: number) => value === row);
    } else {
      this.aceEditor?.session.setBreakpoint(row, "ace_breakpoint");
      this._breakpoints.push(row);
    }

    this.breakpointChange.emit(this._breakpoints);
  }

  private hasBreakpoint(row: number): boolean {
    return _.includes(this._breakpoints, row);
  }

  private removeActiveLine() {
    if (this._activeLine !== -1) {
      this.aceEditor?.session.removeGutterDecoration(
        this._activeLine,
        AsmEditorComponent.ACTIVE_LINE_CLASS
      );
    }
  }
}

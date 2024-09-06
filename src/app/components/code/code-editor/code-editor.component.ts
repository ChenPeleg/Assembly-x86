import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { getScreenMediaState } from "../../../util/screenMediaSatate";
import { Subject } from "rxjs";

import { UserDataService } from "../../../services/user-data.service";
import { EditorState, Extension } from "@codemirror/state";
import { BuildBreakPointGutterExtension } from "../addons/gutter-breakpoints";
import { basicSetup } from "codemirror";
import { customCMTheme } from "../addons/code-mirror-theme";
import { customFoldGutter } from "../addons/gutter-fold-custom-marker";
import { foldService } from "@codemirror/language";
import { getFoldingRangesByIndent } from "../addons/gutter-fold-code";
import { addMultipleTags } from "../addons/build-tags";
import { asmTagList } from "../tag-list";
import { defaultCodeText } from "../../../stores/reducers/code-editor.reducer";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { DOCUMENT } from "@angular/common";

const DEBUG_NO_EVENTS = false;

@Component({
  selector: "code-editor",
  templateUrl: "./code-editor.component.html",
  styleUrls: ["./code-editor.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CodeEditorComponent implements AfterViewInit {
  private static ACTIVE_LINE_CLASS: string = "active-line";
  public title = "component-overview";
  @ViewChild("myeditor") myEditor: any;

  public numberOfLines = 40;
  public isMobile: boolean = getScreenMediaState().isMobile;
  @Output() compile: EventEmitter<string> = new EventEmitter<string>();
  @Output() breakpointChange: EventEmitter<number[]> = new EventEmitter<
    number[]
  >();
  @Input("isTryIt") isTryIt: boolean = false;
  private codeEditorView: EditorView | null = null;
  private codeEditorState: EditorState | null = null;
  private readonly $editorChange: Subject<boolean> = new Subject<boolean>();

  private updateListener = EditorView.updateListener.of((v: ViewUpdate) => {
    if (v.docChanged) {
      this.$editorChange.next(true);
      console.log("Document changed:", v.state.doc.toString());
    }
  });

  constructor(
    private codeEditorService: UserDataService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.codeEditorService.$editorCodeUpdater.subscribe((change) => {
      if (!this.codeEditorView) {
        return;
      }
      this.updateEditorContent(this.codeEditorView, change.code);
    });
  }

  private _breakpoints: { [key: number]: boolean } = {};

  get breakpoints(): number[] {
    return Object.keys(this._breakpoints).map((key) => parseInt(key, 10));
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
    if (!this.codeEditorView) {
      return;
    }

    const line = this.codeEditorView.state.doc.line(value + 1);
    const transaction = this.codeEditorView.state.update({
      selection: { anchor: line.from },
      scrollIntoView: true,
    });

    this.codeEditorView.dispatch(transaction);
  }

  ngAfterViewInit() {
    let myEditorElement = this.myEditor.nativeElement;
    let myExt: Extension = [
      BuildBreakPointGutterExtension(this._breakpoints),
      basicSetup,
      customCMTheme,
      customFoldGutter(),
      foldService.of(getFoldingRangesByIndent),
      addMultipleTags(asmTagList),
      this.updateListener,
    ];

    try {
      this.codeEditorState = EditorState.create({
        doc: defaultCodeText,
        extensions: myExt,
      });

      this.codeEditorView = new EditorView({
        state: this.codeEditorState,
        parent: myEditorElement,
      });
    } catch (e) {
      console.error(e);
    }
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
    const code = this.codeEditorView?.state.doc.toString() || "";
    this.compile.emit(code);
  }

  private updateEditorContent(view: EditorView, newContent: string) {
    const transaction = view.state.update({
      changes: { from: 0, to: view.state.doc.length, insert: newContent },
    });
    view.dispatch(transaction);
  }

  private toggleBreakpoint(row: number) {
    // if (DEBUG_NO_EVENTS) {
    //   return;
    // }
    // if (this.hasBreakpoint(row)) {
    //   this.legacyAceEditor?.session.clearBreakpoint(row);
    //   _.remove(this._breakpoints, (value: number) => value === row);
    // } else {
    //   this.legacyAceEditor?.session.setBreakpoint(row, "ace_breakpoint");
    //   this._breakpoints.push(row);
    // }
    //
    // this.breakpointChange.emit(this._breakpoints);
  }

  private hasBreakpoint(row: number): boolean {
    return false;
    // return _.includes(this._breakpoints, row);
  }

  private removeActiveLine() {
    if (DEBUG_NO_EVENTS) {
      return;
    }
    // if (this._activeLine !== -1 && !this.legacyAceEditor) {
    //   this.legacyAceEditor?.session.removeGutterDecoration(
    //     this._activeLine,
    //     CodeEditorComponent.ACTIVE_LINE_CLASS
    //   );
    // }
  }
}

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

import { UserDataService } from "../../../services/user-data.service";
import { EditorState, Extension } from "@codemirror/state";
import { BuildBreakPointGutterExtension } from "../addons/gutter-breakpoints";
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
  ViewUpdate,
} from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import {
  bracketMatching,
  defaultHighlightStyle,
  foldKeymap,
  foldService,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { lintKeymap } from "@codemirror/lint";
import { customCMTheme } from "../addons/code-mirror-theme";
import { customFoldGutter } from "../addons/gutter-fold-custom-marker";
import { getFoldingRangesByIndent } from "../addons/gutter-fold-code";
import { addMultipleTags } from "../addons/build-tags";
import { asmTagList } from "../tag-list";
import { defaultCodeText } from "../../../services/code-editor-store.service";
import { DOCUMENT } from "@angular/common";

const DEBUG_NO_EVENTS = false;

@Component({
    selector: "code-editor",
    templateUrl: "./code-editor.component.html",
    styleUrls: ["./code-editor.component.scss"],
    encapsulation: ViewEncapsulation.None,
    standalone: false
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
  @Output() editorDocChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input("isTryIt") isTryIt: boolean = false;
  private codeEditorView: EditorView | null = null;
  private codeEditorState: EditorState | null = null;
  // private readonly $editorChange: Subject<boolean> = new Subject<boolean>();

  private updateListener = EditorView.updateListener.of((v: ViewUpdate) => {
    if (v.docChanged) {
      this.editorDocChanged.next(true);
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

    const minimalSetup: Extension = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...lintKeymap,
        indentWithTab,
      ]),
    ];

    let myExt: Extension = [
      BuildBreakPointGutterExtension(this._breakpoints),
      ...minimalSetup,
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

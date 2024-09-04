import {
  AfterViewInit,
  Component,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { basicSetup } from "codemirror";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView, gutter, ViewUpdate } from "@codemirror/view";
import { DOCUMENT } from "@angular/common";
import { addMultipleTags } from "../build-tags";
import { asmTagList } from "../tag-list";
import { defaultCodeText } from "../../../stores/reducers/code-editor.reducer";
import { BreakMarker } from "../gutter-breakpoints";

@Component({
  selector: "code-mirror-handler",
  templateUrl: "./code-mirror-handler.component.html",
  styleUrls: ["./code-mirror-handler.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CodeMirrorHandlerComponent implements AfterViewInit {
  public title = "component-overview";
  @ViewChild("myeditor") myEditor: any;
  private breakpoints: { [key: number]: boolean } = {};

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
    let myEditorElement = this.myEditor.nativeElement;
    let myExt: Extension = [
      basicSetup,
      addMultipleTags(asmTagList),
      this.BuildBreakPointGutter(),
    ];
    let state!: EditorState;

    try {
      state = EditorState.create({
        doc: defaultCodeText,
        extensions: myExt,
      });
    } catch (e) {
      console.error(e);
    }

    let view = new EditorView({
      state,
      parent: myEditorElement,
    });
  }

  private BuildBreakPointGutter(): Extension {
    const breakpoints = this.breakpoints;
    return gutter({
      class: "asm-breakpoints",
      renderEmptyElements: true,

      domEventHandlers: {
        click: (view: EditorView, line: any, event: Event): boolean => {
          const lineNumber = view.state.doc.lineAt(line.from).number;
          // console.log("lineNumber", lineNumber);
          breakpoints[lineNumber] = !breakpoints[lineNumber];
          const changes = { from: line.from, to: line.to };

          var changespec = { from: line.from, to: line.to };
          // @ts-ignore
          var updated = view.state.update([{ changes: changespec }]);
          view.dispatch(updated);

          return true;
        },
      },
      lineMarkerChange: (update: ViewUpdate): boolean => {
        // console.log(update);
        // const num = view.state.doc.lineAt(line.from).number;
        // breakpoints[num] = !breakpoints[num];
        return true;
      },
      lineMarker(view, line) {
        const num = view.state.doc.lineAt(line.from).number;
        return new BreakMarker(breakpoints[num]);
      },
    });
  }
}

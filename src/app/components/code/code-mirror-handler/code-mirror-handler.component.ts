import {
  AfterViewInit,
  Component,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { basicSetup } from "codemirror";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView, gutter } from "@codemirror/view";
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
      class: "ap-breakpoints",
      renderEmptyElements: true,
      domEventHandlers: {
        click: (view, line) => {
          const num = view.state.doc.lineAt(line.from).number;
          // @ts-ignore
          breakpoints[num] = !breakpoints[num];

          const changespec = { from: line.from, to: line.to };
          // @ts-ignore
          const updated = view.state.update([{ changes: changespec }]);
          view.dispatch(updated);
          return true;
        },
      },
      lineMarker(view, line) {
        const num = view.state.doc.lineAt(line.from).number;

        return new BreakMarker(breakpoints[num]);
      },
    });
  }
}

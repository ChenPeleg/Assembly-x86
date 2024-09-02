import { AfterViewInit, Component, Inject, ViewChild } from "@angular/core";
import { basicSetup } from "codemirror";
import { EditorState, Extension, RangeSetBuilder } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "code-mirror-handler",
  templateUrl: "./code-mirror-handler.component.html",
  styleUrls: ["./code-mirror-handler.component.scss"],
})
export class CodeMirrorHandlerComponent implements AfterViewInit {
  title = "component-overview";

  @ViewChild("myeditor") myEditor: any;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  addMultipleTags(): Extension {
    return ViewPlugin.fromClass(
      class {
        decorations: DecorationSet;

        constructor(view: EditorView) {
          this.decorations = this.buildDecorations(view);
        }

        update(update: ViewUpdate) {
          if (update.docChanged || update.viewportChanged) {
            this.decorations = this.buildDecorations(update.view);
          }
        }

        buildDecorations(view: EditorView): DecorationSet {
          let builder = new RangeSetBuilder<Decoration>();
          for (let { from, to } of view.visibleRanges) {
            let text = view.state.doc.sliceString(from, to);
            let tagPositions = this.findTagPositions(text);
            for (let pos of tagPositions) {
              builder.add(
                from + pos.start,
                from + pos.end,
                Decoration.mark({ class: pos.class })
              );
            }
          }
          return builder.finish();
        }

        findTagPositions(
          text: string
        ): { start: number; end: number; class: string }[] {
          let positions = [];
          let regex = /lazer|anotherTag|exampleTag/g;
          let match;
          while ((match = regex.exec(text)) !== null) {
            positions.push({
              start: match.index,
              end: match.index + match[0].length,
              class: `${match[0]}-tag`,
            });
          }
          return positions;
        }
      },
      {
        decorations: (v) => v.decorations,
      }
    );
  }

  ngAfterViewInit(): void {
    let myEditorElement = this.myEditor.nativeElement;
    let myExt: Extension = [basicSetup, this.addMultipleTags()];
    let state!: EditorState;

    try {
      state = EditorState.create({
        doc: 'console.log("hello");\n// type if.',
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
}

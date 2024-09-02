import { AfterViewInit, Component, Inject, ViewChild } from "@angular/core";
import { basicSetup } from "codemirror";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { DOCUMENT } from "@angular/common";
import { addMultipleTags } from "../build-tags";

@Component({
  selector: "code-mirror-handler",
  templateUrl: "./code-mirror-handler.component.html",
  styleUrls: ["./code-mirror-handler.component.scss"],
})
export class CodeMirrorHandlerComponent implements AfterViewInit {
  title = "component-overview";

  @ViewChild("myeditor") myEditor: any;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
    let myEditorElement = this.myEditor.nativeElement;
    let myExt: Extension = [
      basicSetup,
      addMultipleTags([{ name: "consola", regex: /console/g, order: 1 }]),
    ];
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

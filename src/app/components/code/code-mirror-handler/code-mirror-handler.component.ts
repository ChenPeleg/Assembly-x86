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
      addMultipleTags([
        {
          name: "variable.parameter.register.assembly",
          regex: /EAX\b/,
          caseSensitive: true,
          order: 1,
        },
      ]),
    ];
    let state!: EditorState;

    try {
      state = EditorState.create({
        doc:
          "section .data\n" +
          "hello:\n" +
          "    db 'Hello world!', 10, 0\n" +
          "section .text\n" +
          "    MOV EAX, hello\n",
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

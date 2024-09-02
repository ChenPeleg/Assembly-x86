import { AfterViewInit, Component, Inject, ViewChild } from "@angular/core";
import { basicSetup } from "codemirror";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  title = "component-overview";

  @ViewChild("myeditor") myEditor: any;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
    let myEditorElement = this.myEditor.nativeElement;
    let myExt: Extension = [basicSetup];
    let state!: EditorState;

    try {
      state = EditorState.create({
        doc: 'console.log("hello");\n// type if.',
        extensions: myExt,
      });
    } catch (e) {
      //Please make sure install codemirror@6.0.1
      //If your command was npm install codemirror, will installed 6.65.1(whatever)
      //You will be here.
      console.error(e);
    }

    //console.log(state);

    let view = new EditorView({
      state,
      parent: myEditorElement,
    });
  }
}

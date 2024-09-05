import {
  AfterViewInit,
  Component,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { basicSetup } from "codemirror";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { DOCUMENT } from "@angular/common";
import { addMultipleTags } from "../addons/build-tags";
import { asmTagList } from "../tag-list";
import { defaultCodeText } from "../../../stores/reducers/code-editor.reducer";
import { BuildBreakPointGutterExtension } from "../addons/gutter-breakpoints";
import { customCMTheme } from "../addons/code-mirror-theme";
import { jsonFold } from "../addons/json-fold-extention";

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
      BuildBreakPointGutterExtension(this.breakpoints),
      basicSetup,
      customCMTheme,
      jsonFold(),
      // foldService.of(getFoldingRangesByIndent),
      // customFoldGutter(),
      addMultipleTags(asmTagList),
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
}

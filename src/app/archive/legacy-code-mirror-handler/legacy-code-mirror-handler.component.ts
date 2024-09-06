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
import { addMultipleTags } from "../../components/code/addons/build-tags";
import { asmTagList } from "../../components/code/tag-list";
import { defaultCodeText } from "../../stores/reducers/code-editor.reducer";
import { BuildBreakPointGutterExtension } from "../../components/code/addons/gutter-breakpoints";
import { customCMTheme } from "../../components/code/addons/code-mirror-theme";
import { getFoldingRangesByIndent } from "../../components/code/addons/gutter-fold-code";
import { foldService } from "@codemirror/language";
import { customFoldGutter } from "../../components/code/addons/gutter-fold-custom-marker";

@Component({
  selector: "code-mirror-handler",
  templateUrl: "./legacy-code-mirror-handler.component.html",
  styleUrls: ["./legacy-code-mirror-handler.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LegacyCodeMirrorHandlerComponent implements AfterViewInit {
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
      customFoldGutter(),
      foldService.of(getFoldingRangesByIndent),
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

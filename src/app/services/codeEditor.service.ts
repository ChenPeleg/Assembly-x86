import { Injectable } from "@angular/core";
import { CodeEditorState } from "../models/CodeEditorState";
import { Subject } from "rxjs";
import { TypeOfCodeInEditor } from "../models/TypeOfCodeInEditor";

@Injectable()
export class CodeEditorService {
  $editorCodeUpdater: Subject<CodeEditorState> = new Subject<CodeEditorState>();
  typeOfCode: TypeOfCodeInEditor = TypeOfCodeInEditor.Default;
  constructor() {}
  public updateCodeEditor(codeEditorState: CodeEditorState) {
    this.typeOfCode = codeEditorState.typeOfCode;
    this.$editorCodeUpdater.next(codeEditorState);
  }
  public updateCodeChangesTracker(codeEditorState: string | undefined) {
    console.log(codeEditorState);
  }
}

import { Injectable } from "@angular/core";
import { CodeEditorState } from "../models/CodeEditorState";
import { Subject } from "rxjs";
import { TypeOfCodeInEditor } from "../models/TypeOfCodeInEditor";
import { CodeEditorRecord } from "../models/CodeEditorRecord";
import { generateNewId } from "../util/generateNewId";

@Injectable()
export class CodeEditorService {
  $editorCodeUpdater: Subject<CodeEditorState> = new Subject<CodeEditorState>();
  public readonly $currentEditRecordName: Subject<string | null> = new Subject<
    string | null
  >();
  typeOfCode: TypeOfCodeInEditor = TypeOfCodeInEditor.Default;
  codeSavedRecords: CodeEditorRecord[] = [];
  currentSavedRecord: CodeEditorRecord | null = null;
  currentEditorCode: string = "";

  constructor() {}

  public updateCodeEditor(codeEditorState: CodeEditorState) {
    this.typeOfCode = codeEditorState.typeOfCode;
    this.$editorCodeUpdater.next(codeEditorState);
  }

  public updateCodeChangesTracker(codeEditorState: string | undefined) {
    this.currentEditorCode = codeEditorState || "";
  }

  public saveCodeClicked() {
    const newId = generateNewId(this.codeSavedRecords);
    const name = `Draft ${newId}`;
    this.typeOfCode = TypeOfCodeInEditor.Saved;
    this.currentSavedRecord = {
      id: newId.toString(),
      code: this.currentEditorCode,
      name,
    };
    this.$currentEditRecordName.next(name);
  }

  public renameCurrentCodeRecord(newName: string) {
    if (!this.currentSavedRecord) return;
    this.currentSavedRecord.name = newName;
    this.$currentEditRecordName.next(newName);
  }
}

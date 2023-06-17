import { Injectable } from "@angular/core";
import { CodeEditorState } from "../models/CodeEditorState";
import { BehaviorSubject, Subject } from "rxjs";
import { TypeOfCodeInEditor } from "../models/TypeOfCodeInEditor";
import { CodeEditorRecord } from "../models/CodeEditorRecord";
import { generateNewId } from "../util/generateNewId";

@Injectable()
export class CodeEditorService {
  private static readonly LSSaveRecordsKey = "Asm86CodeRecords";
  $editorCodeUpdater: Subject<CodeEditorState> = new Subject<CodeEditorState>();
  public readonly $currentEditRecordName: Subject<string | null> = new Subject<
    string | null
  >();
  public readonly $currentRecordsList: BehaviorSubject<
    { name: string; id: string }[]
  > = new BehaviorSubject<{ name: string; id: string }[]>([]);
  private typeOfCode: TypeOfCodeInEditor = TypeOfCodeInEditor.Default;
  private codeSavedRecords: CodeEditorRecord[] = [];
  private currentSavedRecord: CodeEditorRecord | null = null;
  private currentEditorCode: string = "";

  constructor() {
    this.getRecords();
  }

  public updateCodeEditor(codeEditorState: CodeEditorState) {
    this.typeOfCode = codeEditorState.typeOfCode;
    this.$editorCodeUpdater.next(codeEditorState);
  }

  public updateCodeChangesTracker(codeEditorState: string | undefined) {
    this.currentEditorCode = codeEditorState || "";
    if (
      this.typeOfCode === TypeOfCodeInEditor.Saved &&
      this.currentSavedRecord
    ) {
      this.currentSavedRecord.code = this.currentEditorCode;
    }
  }
  public createNewCodeClicked() {
    this.saveCodeClicked();
  }
  public deleteCodeClicked() {
    if (!this.currentSavedRecord) {
      return;
    }
    const idToRemove = this.currentSavedRecord.id;
    const index = this.codeSavedRecords.map((c) => c.id).indexOf(idToRemove);
    this.codeSavedRecords = this.codeSavedRecords.filter(
      (r) => r.id !== idToRemove
    );
    this.saveCodeToRecords();
    if (!this.codeSavedRecords.length) {
      this.$currentEditRecordName.next("");
      this.typeOfCode = TypeOfCodeInEditor.Draft;
      this.currentSavedRecord = null;
      return;
    }
    const newRecordIndex = index > 0 ? index - 1 : 0;
    const newRecordToEdit = this.codeSavedRecords[newRecordIndex];
    this.choseRecordClicked({
      id: newRecordToEdit.id,
      name: newRecordToEdit.name,
    });
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
    this.codeSavedRecords.push(this.currentSavedRecord);

    this.$currentEditRecordName.next(name);
    this.saveCodeToRecords();
  }
  public choseRecordClicked(record: { name: string; id: string }) {
    const chosenRecord = this.codeSavedRecords.find(
      (r) => r.id === record.id
    ) as CodeEditorRecord;

    this.currentSavedRecord = chosenRecord;
    this.updateCodeEditor({
      code: chosenRecord.code,
      typeOfCode: TypeOfCodeInEditor.Saved,
      savedCodeId: chosenRecord.id,
    });
    this.$currentEditRecordName.next(chosenRecord.name);
  }

  public renameCurrentCodeRecord(newName: string) {
    if (!this.currentSavedRecord) return;
    this.currentSavedRecord.name = newName;
    this.$currentEditRecordName.next(newName);
    this.saveCodeToRecords();
  }
  private saveCodeToRecords(): void {
    window.localStorage.setItem(
      CodeEditorService.LSSaveRecordsKey,
      JSON.stringify(this.codeSavedRecords)
    );
    this.$currentRecordsList.next(
      this.codeSavedRecords.map((r) => ({ name: r.name, id: r.id }))
    );
  }

  private getRecords() {
    const records = window.localStorage.getItem(
      CodeEditorService.LSSaveRecordsKey
    );

    this.codeSavedRecords = (records && JSON.parse(records)) || [];
    console.log(this.codeSavedRecords);
    this.$currentRecordsList.next(
      this.codeSavedRecords.map((r) => ({ name: r.name, id: r.id }))
    );
  }
}

import { Injectable } from "@angular/core";
import { CodeEditorState } from "../models/CodeEditorState";
import { Subject } from "rxjs";

@Injectable()
export class CodeEditorService {
  $editorCodeUpdated: Subject<CodeEditorState> = new Subject<CodeEditorState>();
  constructor() {}
}

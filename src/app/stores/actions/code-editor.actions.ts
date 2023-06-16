import { createAction, props } from "@ngrx/store";
import { CodeEditorState } from "../../models/CodeEditorState";

export const CodeEditorActions = {
  setCode: createAction(
    "[Code Editor Component] SetCode",
    props<CodeEditorState>()
  ),
  getCode: createAction(
    "[Code Editor Component] GetCode",
    props<CodeEditorState>()
  ),
  updateSavedRecordCode: createAction(
    "[Code Editor Component] updateSavedRecordCode",
    props<CodeEditorState>()
  ),
  resetCode: createAction(
    "[Code Editor Component] Reset",
    props<CodeEditorState>()
  ),
};

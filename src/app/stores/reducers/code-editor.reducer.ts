import { createReducer, on } from "@ngrx/store";
import { getCode, resetCode, setCode } from "../actions/code-editor.actions";

export const initialState = 0;

export const codeEditorReducer = createReducer(
  initialState,
  on(setCode, (state) => state + 1),
  on(getCode, (state) => state - 1),
  on(resetCode, (state) => 0)
);

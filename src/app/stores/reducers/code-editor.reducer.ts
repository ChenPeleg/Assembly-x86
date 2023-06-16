import { createReducer, on } from "@ngrx/store";
import { CodeEditorActions } from "../actions/code-editor.actions";
import { CodeEditorState } from "../../models/CodeEditorState";
import { TypeOfCodeInEditor } from "../../models/TypeOfCodeInEditor";

const defaultCodeText = `section .data
hello:
    db 'Hello world!', 10, 0
section .text
    MOV EAX, hello
    INT 2   ; print string EAX

    PUSH 5
    CALL factorial
    INT 1   ; print EAX
    HLT

factorial:
    ENTER

    CMP [EBP + 8], 1
    JNE .recurse
    MOV EAX, 1
    JMP .end

.recurse:
    MOV EAX, [EBP + 8]
    DEC EAX

    PUSH EAX
    CALL factorial

    IMUL [EBP + 8]

.end:
    LEAVE
    RET
`;

export const initialState: CodeEditorState = {
  code: defaultCodeText,
  typeOfCode: TypeOfCodeInEditor.Default,
  savedCodeId: null,
};

export const codeEditorReducer = createReducer(
  initialState,
  on(
    CodeEditorActions.setCode,
    (state: CodeEditorState, { code, typeOfCode, type }) => {
      return { ...state, code, type, typeOfCode };
    }
  ),
  on(
    CodeEditorActions.getCode,
    (state: CodeEditorState, { code, typeOfCode, type }) => {
      return { ...state, code, type, typeOfCode };
    }
  ),
  on(
    CodeEditorActions.updateSavedRecordCode,
    (state: CodeEditorState, { code, typeOfCode, type }) => {
      return { ...state, code, type, typeOfCode };
    }
  ),
  on(
    CodeEditorActions.resetCode,
    (state: CodeEditorState, { code, typeOfCode, type }) => {
      return { ...state, ...initialState };
    }
  )
);

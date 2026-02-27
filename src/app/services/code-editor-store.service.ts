import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CodeEditorState } from "../models/CodeEditorState";
import { TypeOfCodeInEditor } from "../models/TypeOfCodeInEditor";

export const defaultCodeText = `section .data
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

export const initialCodeEditorState: CodeEditorState = {
  code: defaultCodeText,
  typeOfCode: TypeOfCodeInEditor.Default,
  savedCodeId: null,
};

@Injectable({ providedIn: "root" })
export class CodeEditorStoreService {
  private readonly _state$ = new BehaviorSubject<CodeEditorState>(
    structuredClone(initialCodeEditorState)
  );
  public readonly state$ = this._state$.asObservable();

  setCode(state: CodeEditorState): void {
    this._state$.next({ ...this._state$.getValue(), ...state });
  }

  updateSavedRecordCode(state: CodeEditorState): void {
    this._state$.next({ ...this._state$.getValue(), ...state });
  }

  resetCode(): void {
    this._state$.next(structuredClone(initialCodeEditorState));
  }
}

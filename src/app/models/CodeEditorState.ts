import { TypeOfCodeInEditor } from "./TypeOfCodeInEditor";

export interface CodeEditorState {
  code: string;
  typeOfCode: TypeOfCodeInEditor;
  savedCodeId: string | null;
}

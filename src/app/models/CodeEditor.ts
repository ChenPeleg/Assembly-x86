import { TypeOfCodeInEditor } from "./TypeOfCodeInEditor";

export type CodeEditor =
  | {
      code: string;
      typeOfCode:
        | TypeOfCodeInEditor.Default
        | TypeOfCodeInEditor.Draft
        | TypeOfCodeInEditor.TryIt;
    }
  | {
      code: string;
      typeOfCode: TypeOfCodeInEditor.Saved;
      savedCodeId: string;
    };

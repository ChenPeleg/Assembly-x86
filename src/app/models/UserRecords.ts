import { CodeEditorRecord } from "./CodeEditorRecord";
import { AppUser } from "../provider/applinksClientTypes";

export interface UserRecords {
  user: AppUser | null;
  records: CodeEditorRecord[];
  timestamp: number;
}

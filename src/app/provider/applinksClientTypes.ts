import { APPLinksClient } from "./appLinksClient";

export type ApplinksClientEvents =
  keyof typeof APPLinksClient.ApplinksClientEvents;
export interface AppUser {
  fullName: string;
  id: string | number;
  username: string;
}

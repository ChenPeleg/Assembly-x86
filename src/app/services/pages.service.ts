import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom, tap } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

export enum MDFiles {
  Links = "links",
}

@Injectable()
export class PagesService {
  private _pagesNames: string[][] = [];

  constructor(private httpClient: HttpClient) {
    this.getAllPagesList().then((r) => r);
  }

  public static linkFromPageName(linkNames: string[]) {
    return `/${linkNames.join("/")}`;
  }

  public async getPagesNames() {
    return this._pagesNames.length
      ? this._pagesNames
      : await this.getAllPagesList();
  }

  async getAllPagesList() {
    if (this._pagesNames.length) {
      return this._pagesNames;
    }
    const allPagesContent = await firstValueFrom(
      this.httpClient.get(`assets/documentation/doclist.txt`, {
        responseType: "text",
      })
    );
    const links = allPagesContent.split("\n");
    this._pagesNames = links.map((l) => l.split("/").filter((n) => n));
    return this._pagesNames;
  }

  public async getMarkdownText(fileName: MDFiles): Promise<string> {
    return await firstValueFrom(
      this.httpClient.get(`assets/documentation/${fileName}.md`, {
        responseType: "text",
      })
    );
  }
}

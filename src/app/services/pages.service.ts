import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

export enum MDFiles {
  Links = "links",
}

@Injectable()
export class PagesService {
  static readonly slashReplacesChar = "+";
  private _pagesNames: string[][] = [];

  constructor(private httpClient: HttpClient) {
    this.getAllPagesList().then((r) => r);
  }

  public static linkFromPageName(linkNames: string[]): string {
    return `/${linkNames.join("/")}`;
  }

  public static DocIdToNamePage(docId: string): string[] {
    return docId.split(PagesService.slashReplacesChar);
  }

  public static NamePageToDocId(namePage: string[]): string {
    return namePage.join(PagesService.slashReplacesChar);
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
    const linesFromDocsTextFile = allPagesContent.split("\n");
    this._pagesNames = linesFromDocsTextFile.map((l) =>
      l
        .replace(".md", "")
        .split("/")
        .filter((n) => n)
    );
    return this._pagesNames;
  }

  public async getMarkdownText(docId: string): Promise<string> {
    const link = PagesService.linkFromPageName(
      PagesService.DocIdToNamePage(docId)
    );
    return await firstValueFrom(
      this.httpClient.get(`assets/documentation${link}.md`, {
        responseType: "text",
      })
    );
  }
}

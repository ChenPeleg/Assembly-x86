import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { DefaultDocsLanguage, DocsLanguage } from "./docs-language.service";

export interface MarkdownPage {
  text: string;
  /** The language actually loaded; English when a translation is missing. */
  language: DocsLanguage;
}

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

  public getFirstDocInTheDocumentsList(): string {
    return PagesService.NamePageToDocId(this._pagesNames[0]);
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
    this._pagesNames = linesFromDocsTextFile
      .map((l) =>
        l
          .replace(".md", "")
          .split("/")
          .filter((n) => n)
      )
      .map((p) => p.map((n) => n.replace(/<.*?>/g, "").trim()));
    return this._pagesNames;
  }

  /**
   * Relative folder of a translated documentation tree. English pages live at the root
   * of assets/documentation and remain the canonical source and navigation.
   */
  public static languageFolder(language: DocsLanguage): string {
    return language === DefaultDocsLanguage ? "" : `/${language}`;
  }

  public async getMarkdownText(docId: string): Promise<string> {
    return (await this.getMarkdownPage(docId, DefaultDocsLanguage)).text;
  }

  /**
   * Loads a page in the requested language, falling back to its English counterpart
   * when the translation does not exist.
   */
  public async getMarkdownPage(
    docId: string,
    language: DocsLanguage
  ): Promise<MarkdownPage> {
    if (language !== DefaultDocsLanguage) {
      try {
        const text = await this.fetchMarkdown(docId, language);
        if (text.trim()) {
          return { text, language };
        }
      } catch {
        // Missing translation - fall back to English below.
      }
    }
    const text = await this.fetchMarkdown(docId, DefaultDocsLanguage);
    return { text, language: DefaultDocsLanguage };
  }

  private async fetchMarkdown(
    docId: string,
    language: DocsLanguage
  ): Promise<string> {
    const link = PagesService.linkFromPageName(
      PagesService.DocIdToNamePage(docId)
    );
    const folder = PagesService.languageFolder(language);
    return await firstValueFrom(
      this.httpClient.get(`assets/documentation${folder}${link}.md`, {
        responseType: "text",
      })
    );
  }
}

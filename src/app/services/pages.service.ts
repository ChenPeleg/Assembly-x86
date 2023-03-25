import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom, tap } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

export enum MDFiles {
  Links = "links",
}

@Injectable()
export class PagesService {
  constructor(private httpClient: HttpClient) {}

  public async getMarkdownText(fileName: MDFiles): Promise<string> {
    return await firstValueFrom(
      this.httpClient.get(`assets/markdown/${fileName}.md`, {
        responseType: "text",
      })
    );
  }
}

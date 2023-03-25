import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

export enum MDFiles {
  Links = "Links",
}

@Injectable()
export class PagesService {
  constructor(private httpClient: HttpClient) {}

  public async getMarkdownText(fileName: MDFiles): Promise<string> {
    return await firstValueFrom(
      this.httpClient.get(`assets/markdown/${fileName}`, {
        responseType: "text",
      })
    );
  }
}

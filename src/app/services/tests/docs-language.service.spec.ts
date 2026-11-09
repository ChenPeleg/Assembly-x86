import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { DocsLanguageService } from "../docs-language.service";
import { PagesService } from "../pages.service";

describe("DocsLanguageService", () => {
  beforeEach(() => localStorage.removeItem(DocsLanguageService.StorageKey));
  afterEach(() => localStorage.removeItem(DocsLanguageService.StorageKey));

  it("defaults to English when no preference is saved", () => {
    expect(new DocsLanguageService().language).toBe("en");
  });

  it("defaults to English when the saved preference is invalid", () => {
    localStorage.setItem(DocsLanguageService.StorageKey, "fr");
    expect(new DocsLanguageService().language).toBe("en");
  });

  it("restores a persisted Hebrew preference", () => {
    localStorage.setItem(DocsLanguageService.StorageKey, "he");
    expect(new DocsLanguageService().language).toBe("he");
  });

  it("persists and emits the toggled language", () => {
    const service = new DocsLanguageService();
    const emitted: string[] = [];
    service.languageChanges.subscribe((l) => emitted.push(l));

    service.setLanguage("he");
    expect(service.language).toBe("he");
    expect(localStorage.getItem(DocsLanguageService.StorageKey)).toBe("he");

    service.setLanguage("en");
    expect(localStorage.getItem(DocsLanguageService.StorageKey)).toBe("en");
    expect(emitted).toEqual(["en", "he", "en"]);
  });

  it("ignores unsupported languages", () => {
    const service = new DocsLanguageService();
    service.setLanguage("fr" as any);
    expect(service.language).toBe("en");
    expect(localStorage.getItem(DocsLanguageService.StorageKey)).toBeNull();
  });

  it("marks only Hebrew as right-to-left", () => {
    expect(DocsLanguageService.isRtl("he")).toBeTrue();
    expect(DocsLanguageService.isRtl("en")).toBeFalse();
  });
});

describe("PagesService localized pages", () => {
  const docId = "01 basics+02 hello world";
  const englishUrl = "assets/documentation/01 basics/02 hello world.md";
  const hebrewUrl = "assets/documentation/he/01 basics/02 hello world.md";
  let service: PagesService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PagesService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PagesService);
    http = TestBed.inject(HttpTestingController);
    // The constructor eagerly requests the canonical (English) page list.
    http.expectOne("assets/documentation/doclist.txt").flush("");
  });

  afterEach(() => http.verify());

  it("loads English pages from the canonical folder", async () => {
    const page = service.getMarkdownPage(docId, "en");
    http.expectOne(englishUrl).flush("# Hello world");
    expect(await page).toEqual({ text: "# Hello world", language: "en" });
  });

  it("loads the Hebrew translation from the mirrored folder", async () => {
    const page = service.getMarkdownPage(docId, "he");
    http.expectOne(hebrewUrl).flush("# שלום עולם");
    expect(await page).toEqual({ text: "# שלום עולם", language: "he" });
  });

  it("falls back to English when the Hebrew page is missing", async () => {
    const page = service.getMarkdownPage(docId, "he");
    http
      .expectOne(hebrewUrl)
      .flush("Not found", { status: 404, statusText: "Not Found" });
    await Promise.resolve();
    await new Promise((r) => setTimeout(r));
    http.expectOne(englishUrl).flush("# Hello world");
    expect(await page).toEqual({ text: "# Hello world", language: "en" });
  });
});

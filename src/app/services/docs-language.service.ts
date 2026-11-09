import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export type DocsLanguage = "en" | "he";

export const DefaultDocsLanguage: DocsLanguage = "en";
export const SupportedDocsLanguages: readonly DocsLanguage[] = ["en", "he"];
export const RtlDocsLanguages: readonly DocsLanguage[] = ["he"];

/**
 * Holds the language selected for the documentation pages only.
 * English is the default and the source of truth; the emulator UI is never translated.
 */
@Injectable({ providedIn: "root" })
export class DocsLanguageService {
  public static readonly StorageKey = "docsLanguage";

  private readonly language$: BehaviorSubject<DocsLanguage>;

  constructor() {
    this.language$ = new BehaviorSubject<DocsLanguage>(
      DocsLanguageService.readStoredLanguage()
    );
  }

  public static isSupportedLanguage(value: unknown): value is DocsLanguage {
    return SupportedDocsLanguages.includes(value as DocsLanguage);
  }

  public static isRtl(language: DocsLanguage): boolean {
    return RtlDocsLanguages.includes(language);
  }

  private static readStoredLanguage(): DocsLanguage {
    try {
      const stored = localStorage.getItem(DocsLanguageService.StorageKey);
      return DocsLanguageService.isSupportedLanguage(stored)
        ? stored
        : DefaultDocsLanguage;
    } catch {
      return DefaultDocsLanguage;
    }
  }

  public get language(): DocsLanguage {
    return this.language$.value;
  }

  public get languageChanges(): Observable<DocsLanguage> {
    return this.language$.asObservable();
  }

  public setLanguage(language: DocsLanguage) {
    if (!DocsLanguageService.isSupportedLanguage(language)) {
      return;
    }
    try {
      localStorage.setItem(DocsLanguageService.StorageKey, language);
    } catch {
      // Storage may be unavailable (private mode); keep the in-memory choice.
    }
    if (language !== this.language$.value) {
      this.language$.next(language);
    }
  }
}

import { DocsLanguage } from "./docs-language.service";

/** Text of the documentation view itself (not the pages), per docs language. */
export interface DocsLabels {
  previous: string;
  next: string;
  tableOfContents: string;
  loading: string;
  tryMe: string;
  languageToggle: string;
  /** Buttons shown above the assembler opened from a "Try me" example. */
  closeAssembler: string;
  backToDocs: string;
  /** HTML shown on the docs landing page (no page selected). */
  welcomeHtml: string;
}

const davisLink = `<a href="https://github.com/Kobzol/davis">https://github.com/Kobzol/davis</a>`;

export const DocsLabelsByLanguage: Record<DocsLanguage, DocsLabels> = {
  en: {
    previous: "previous",
    next: "next",
    tableOfContents: "Table of contents",
    loading: "Loading documentation...",
    tryMe: "Try me",
    languageToggle: "Documentation language",
    closeAssembler: "Close assembler",
    backToDocs: "Back to docs",
    welcomeHtml: `Welcome to the Assembly x86 emulator and tutorial! <br>
    This project is based on ${davisLink}.
    This tool allows writing, running and debugging x86 assembly in the browser.
    You can start with the tutorial in the basics section, learn how to use the emulator, or go to more advanced examples.`,
  },
  he: {
    previous: "הקודם",
    next: "הבא",
    tableOfContents: "תוכן העניינים",
    loading: "טוען את התיעוד...",
    tryMe: "נסו אותי",
    languageToggle: "שפת התיעוד",
    closeAssembler: "סגירת האסמבלר",
    backToDocs: "חזרה לתיעוד",
    welcomeHtml: `ברוכים הבאים לאמולטור ולמדריך של Assembly x86! <br>
    הפרויקט מבוסס על ${davisLink}.
    הכלי מאפשר לכתוב, להריץ ולדבג קוד אסמבלי x86 בדפדפן.
    אפשר להתחיל במדריך שבפרק היסודות, ללמוד איך משתמשים באמולטור, או לעבור לדוגמאות מתקדמות יותר.`,
  },
};

export const docsLabels = (language: DocsLanguage): DocsLabels =>
  DocsLabelsByLanguage[language] ?? DocsLabelsByLanguage.en;

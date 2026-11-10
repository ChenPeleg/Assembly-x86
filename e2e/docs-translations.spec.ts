import { expect, test } from "@playwright/test";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

// Static checks of the translated documentation files; no browser needed.
const docsDir = join(__dirname, "..", "src", "assets", "documentation");
const languages = ["he"];

const docPaths = readFileSync(join(docsDir, "doclist.txt"), "utf8")
  .split("\n")
  .map((l) => l.replace(/<.*?>/g, "").trim().replace(/^\//, ""))
  .filter((l) => l.endsWith(".md"))
  .map((l) => l.replace(/\.md$/, ""));

// A code block plus the emulator options comment that may follow it.
const codeBlocks = (markdown: string) =>
  (markdown.match(/```[^`]*```[^<`]*(<!--[^>]*-->)?/g) || []).map((block) => {
    const code = block.match(/```[^`]*```/)![0];
    const options = block.match(/<!--[^>]*-->/)?.[0] ?? "";
    return `${code}\n${options}`;
  });

test.describe("translated documentation", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "file checks only need to run once");
  });

  for (const language of languages) {
    test(`${language}: code blocks and emulator options match English`, () => {
      const mismatches = docPaths.filter((path) => {
        const translated = join(docsDir, language, `${path}.md`);
        if (!existsSync(translated)) return false; // falls back to English
        const english = readFileSync(join(docsDir, `${path}.md`), "utf8");
        return (
          JSON.stringify(codeBlocks(english)) !==
          JSON.stringify(codeBlocks(readFileSync(translated, "utf8")))
        );
      });
      expect(mismatches).toEqual([]);
    });

    test(`${language}: every page and folder has a title`, () => {
      const titles = JSON.parse(
        readFileSync(join(docsDir, language, "titles.json"), "utf8")
      );
      const paths = new Set<string>();
      for (const path of docPaths) {
        const parts = path.split("/");
        parts.forEach((_, i) => paths.add(parts.slice(0, i + 1).join("/")));
      }
      const missing = [...paths].filter((p) => !titles[p]);
      const unknown = Object.keys(titles).filter((p) => !paths.has(p));
      expect(missing).toEqual([]);
      expect(unknown).toEqual([]);
    });

    test(`${language}: no line starts with ** (the converter turns it into a bullet)`, () => {
      const offenders = docPaths.flatMap((path) => {
        const translated = join(docsDir, language, `${path}.md`);
        if (!existsSync(translated)) return [];
        return readFileSync(translated, "utf8")
          .split("\n")
          .map((line, i) => (/^\s*\*\*/.test(line) ? `${path}.md:${i + 1}` : ""))
          .filter(Boolean);
      });
      expect(offenders).toEqual([]);
    });
  }
});

# Todos

- upgrade angular
- upgrade to angular 20
- upgrade to tailwind 4
- replace all the material ui with tailwind
- simplify the codebase & ui
- add a dark mode
- add documentation for the Copilot auto flow workflow

## Dev setup

- fix Playwright e2e setup: `@playwright/test` (^1.64.1) expects browser builds that aren't installed in the cloud environment (it looks for `chromium_headless_shell-1248` while `/opt/pw-browsers` has `-1243`), so `npm run e2e` fails unless the browser path is overridden. Either pin `@playwright/test` to the version matching the preinstalled browsers, or add an env-driven `launchOptions.executablePath` (e.g. `PW_CHROMIUM_PATH`) to `playwright.config.ts`
- fix `package-lock.json` being out of sync with `package.json` (`npm ci` fails: missing chokidar@4.0.3 / readdirp@4.1.2)
- align the Node version: `package.json` requires Node 24 but the cloud environment runs Node 22 (`npm install` warns with `EBADENGINE`)
- add a check that every Hebrew page in `src/assets/documentation/he/` keeps its code blocks and `<!-- console memory cpu ... -->` options identical to the English page, so "Try me" keeps loading the same programs (this was only checked with a one-off script)

## Markdown converter (`src/app/util/markdown/markdownToHtmlConverter.ts`)

- fix `tutorials/tutorials.md` freezing the browser (English and Hebrew): the converter never finishes rendering this large page, probably catastrophic regex backtracking. Both overflow e2e tests for it are marked `test.fixme`; re-enable them once fixed
- a line that starts with `**bold**` becomes a list bullet (the list regex `^\s*\*\s*(.*)$` runs before bold conversion) and the rest of the paragraph turns italic. Several English pages hit this (e.g. "**Try it:**" lines); Hebrew pages work around it with `<strong>`
- numbered lists (`1.`, `2.`, ...) are not converted and run together into one paragraph (e.g. "Understanding the Code" in the quick start)
- code blocks lose their indentation: `white-space: pre-line` on `.code-block pre code` collapses leading spaces
- inline code written with triple backticks (e.g. ```` ```.text``` ```` in the tutorials page) is treated as a code block by `findMdCodeBlocks`, which also shifts the numbering of "Try me" examples; use single backticks instead
- heading anchors are not generated, so the table of contents links at the top of the tutorials page (`#introduction`, ...) go nowhere

## Documentation content (English)

- tutorials page: "n AND 4 clears bit 3" / "n OR 4 sets bit 3" is wrong (AND with 4 clears nothing, and 4 is bit 2; use `n AND ~4` / `n OR 4`). The Hebrew page has the corrected text
- tutorials page: "AND with 7 gets you a result between 0 and 8" should be 0 to 7 (and "AND with 3" gives 0 to 3)
- tutorials page: the stack-frame explanation has the RBP offsets reversed: arguments are at positive offsets and locals at negative offsets
- tutorials page: wrong examples inside code blocks: `001111101b << 1 = 001111100b` (should be `011111010b`) and the hex table row `0117 | 7` (should be `0111`). Fix them in the Hebrew page too, since code blocks are kept identical
- `01 basics/09 memory.md`: two garbled sentences ("When an element is pushed to the stack, the stack the next time...") and the example comments don't match the values (`mov [8], 97 ; ... value 87`, `mov [12], 112 ; ... value 108`)
- `01 basics/03 binary numbers.md`: stray sentence "The Markdown format allows for easy formatting and readability." and the typo "tou"
- `02 binary numbers/01 Numeral system.md`: the "Introduction - What are numeral systems?" heading has no content
- `02 binary numbers/03 Representing numbers - overflow.md`: unfinished sentence "indicating that an overflow condition has"
- `about.md` says "Built with Angular 15" but the app uses Angular 20
- history pages are "WIP" placeholders, and `history/test.md` looks like a test page that is listed in the navigation
- `01 basics/bit-tables.md`: title typo "Bit talbes"

## Hebrew documentation

- the English/Hebrew toggle is only on the first docs page (as plan_07 specifies); consider showing it on every docs page (one-line change in `showLanguageToggle`)
- the page titles in the header and the table of contents stay English (they come from file names in `doclist.txt`); consider translated titles
- when an English page changes, its Hebrew page in `src/assets/documentation/he/` must be updated too; consider a check that flags English pages edited after their translation

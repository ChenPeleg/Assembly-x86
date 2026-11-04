# Task: Fix Mobile Horizontal (X-axis) Overflow, Especially in Documentation

## Objective
Eliminate horizontal scrolling on mobile viewports (≤640px) across the app, with focus on the documentation page
(with and without "try it" open), and guard against regressions with Playwright tests.

## Steps
1. Install Playwright: `npm i -D @playwright/test` + `npx playwright install chromium`; add `playwright.config.ts`
   (webServer `npm start`, baseURL `http://localhost:4200`, projects: iPhone 12/Pixel 5/desktop) and script `"e2e": "playwright test"`.
2. Create `e2e/mobile-overflow.spec.ts`: visit welcome, editor, and every doc page from `src/assets/documentation/doclist.txt`;
   for each, assert `document.documentElement.scrollWidth <= window.innerWidth` and log offenders
   (elements whose `getBoundingClientRect().right > innerWidth`). Repeat after clicking a `button.run-code` (try-it open).
3. Run it, save full-page screenshots to `test-results/`, and list the actual offending selectors before changing CSS.
4. Likely suspects to verify/fix (`src/app/components/...`):
   - `pages/documentation/documentation.component.css`: `.html-content` tables → wrap in `overflow-x:auto` / `display:block`;
     `pre` → `overflow-x:auto`; long inline code/links → `overflow-wrap:anywhere`; `img` → `max-width:100%`.
   - `pages/documentation/documentation.component.html`: add `min-w-0` to flex children; ToC wrapper `ml-6` + `w-3/4` (content-table).
   - `pages/documentation/documentation.component.ts`: `openClose` animation (`width:100%` + siblings) on mobile.
   - `core/core-app.component.css` (`width:50vw`), `code/code-editor/code-editor.component.css` (fixed 440px/370px widths),
     `memory/memory.html` (`max-sm:w-[98vw]` plus margins), `navbar/nav-bar.component.html`.
5. Fix root causes per element (avoid a blanket `overflow-x:hidden` on `body`, which hides bugs and breaks sticky elements).
6. Re-run `npm run e2e` until all pages pass on mobile projects; confirm desktop screenshots unchanged.
7. Optionally add `npm run e2e` to CI (`.github/workflows`) and document it in `README.md`.

# Plan: Remove jQuery from Application

## Objective

Remove the unused jQuery 2.2.4 CDN script from `src/index.html` to eliminate the unnecessary network request and external dependency.

## Steps

1. **Remove the jQuery `<script>` tag from `src/index.html`**
   - Delete the following block (lines 19–21):
     ```html
     <script crossorigin="anonymous"
             integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
             src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
     ```
   - No replacement is needed — jQuery is not called anywhere in the application.

2. **Verify no jQuery usages exist in source files**
   - Search the `src/` directory for any `$()`, `jQuery()`, or `jquery` references in `.ts`, `.html`, and `.js` files.
   - The `.pegjs` grammar files use `$()` as a PEG.js operator (not jQuery) — these are safe to ignore.

3. **Verify**
   - Run `npm run build` — no compilation errors
   - Run `npm test` — all existing tests pass
   - Manual smoke-test: open the application in a browser, confirm all features (editor, memory display, documentation, "Try me" buttons) work correctly without jQuery loaded

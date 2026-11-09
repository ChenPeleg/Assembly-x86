# Task: Support Hebrew Documentation

## Objective
Add Hebrew as an optional language for documentation only. Keep English as the default and source of truth; do not translate or change the emulator UI.

## Steps
1. Add a mirrored Hebrew documentation folder under `src/assets/documentation/` with matching relative paths for translated pages; keep English pages and `doclist.txt` as the canonical navigation.
2. Add an English/Hebrew language toggle to the first documentation page and persist the selected language in `localStorage`; use English when no valid preference is saved.
3. Load the selected-language page when available and fall back to its English counterpart when a Hebrew translation is missing.
4. Translate prose only; keep assembly code snippets, code-related technical text, and other untranslated content in English, and render code blocks left-to-right.
5. Apply right-to-left direction to Hebrew prose without reversing code blocks or breaking documentation navigation, links, or the emulator layout.
6. Add focused tests for the default and persisted language, toggle behavior, missing-page fallback, and RTL/LTR rendering.
7. Verify English remains unchanged by default and manually check representative Hebrew pages, navigation, and runnable snippets.

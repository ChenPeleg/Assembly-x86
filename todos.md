# Todos

- upgrade angular
- upgrade to angular 20
- upgrade to tailwind 4
- replace all the material ui with tailwind
- simplify the codebase & ui
- add a dark mode
- add documentation for the Copilot auto flow workflow
- fix Playwright e2e setup: `@playwright/test` (^1.64.1) expects browser builds that aren't installed in the cloud environment (it looks for `chromium_headless_shell-1248` while `/opt/pw-browsers` has `-1243`), so `npm run e2e` fails unless the browser path is overridden. Either pin `@playwright/test` to the version matching the preinstalled browsers, or add an env-driven `launchOptions.executablePath` (e.g. `PW_CHROMIUM_PATH`) to `playwright.config.ts`
- fix `package-lock.json` being out of sync with `package.json` (`npm ci` fails: missing chokidar@4.0.3 / readdirp@4.1.2)

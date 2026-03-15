# Plan: Upgrade to Tailwind CSS v4

## Objective

Upgrade Tailwind CSS from v3 to v4 and remove the PostCSS-based plugin setup that Tailwind v3 required. Tailwind v4 ships its own PostCSS integration via `@tailwindcss/postcss`, eliminating the need for the standalone `postcss` and `autoprefixer` packages and the `tailwind.config.js` file.

## Background

Tailwind v4 is a full rewrite with a CSS-first approach:

- **No more `tailwind.config.js`**: theme customization moves into `@theme {}` blocks in the CSS entry point.
- **No more `@tailwind` directives**: replaced by a single `@import "tailwindcss"` in a plain `.css` file.
- **No more `autoprefixer`**: vendor prefixing is built into Tailwind v4; remove it.
- **No more standalone `postcss`**: `@tailwindcss/postcss` bundles its own PostCSS runtime; the explicit `postcss` dev-dependency is no longer required.
- **Auto content detection**: Tailwind v4 scans the project automatically; the `content` array is no longer needed.
- **SCSS constraint**: `@import "tailwindcss"` only works in a plain `.css` file, not inside an `.scss` file. A dedicated `src/tailwind.css` entry point is used for the Tailwind import; all existing `.scss` files continue to work unchanged.

## Steps

1. **Uninstall old packages**

   ```bash
   npm uninstall tailwindcss postcss autoprefixer
   ```

2. **Install new packages**

   ```bash
   npm install -D tailwindcss@latest @tailwindcss/postcss
   ```

3. **Create `postcss.config.js`** in the project root

   The project currently has no `postcss.config.js`. The build is configured with `@angular-builders/custom-webpack:browser` (see `angular.json`), which discovers a `postcss.config.js` in the project root automatically and applies it during the CSS pipeline.

   ```js
   module.exports = {
     plugins: {
       '@tailwindcss/postcss': {},
     },
   };
   ```

4. **Create `src/tailwind.css`** — the Tailwind v4 CSS entry point

   ```css
   @import "tailwindcss";
   ```

   If custom theme tokens are needed (e.g. brand colors, font families), add a `@theme` block here:

   ```css
   @import "tailwindcss";

   @theme {
     /* --color-brand: #c09e5a; */
   }
   ```

5. **Update `angular.json`** — prepend `src/tailwind.css` to the `styles` array

   ```json
   "styles": ["src/tailwind.css", "src/styles.scss"]
   ```

   This ensures Tailwind's base, components, and utilities are injected before any project-level SCSS overrides.

6. **Update `src/styles.scss`** — remove the three legacy `@tailwind` directives

   Delete these lines:

   ```scss
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

7. **Delete `tailwind.config.js`**

   Configuration has moved into `src/tailwind.css` via `@theme {}` blocks. The file is no longer needed.

8. **Verify**
   - Run `npm run build` — confirm no compilation errors.
   - Run `npm test` — confirm all existing tests pass.
   - Visual smoke-test: open the app in the browser and confirm layout, spacing, typography, and color utilities (e.g. those in `layout.component.scss` and templates) all render correctly.

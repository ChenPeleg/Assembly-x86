# Plan: Migrate CSS Classes to Tailwind

## Objective
Replace custom SCSS utility classes with Tailwind CSS utility classes across all component stylesheets. Tailwind is already installed and configured (`tailwind.config.js`). Some components already use Tailwind in their HTML templates or via `@apply`; this plan covers the remaining ones.

## What Can Be Migrated

### 1. `src/app/components/console/console.scss`
- `.text { height: 300px }` → add `class="h-[300px]"` in template; delete scss rule

### 2. `src/app/components/core/core-app.component.scss`
- `#core-app-wrapper h3` margin/font/padding rules → Tailwind utilities in template
- `.nav-bar-spacer { width: 90%; height: 58px; min-height: 64px }` → `class="w-[90%] h-[58px] min-h-[64px]"`
- `#utils-wrapper { max-height: calc(100vh - 100px); overflow-y: auto }` → `class="max-h-[calc(100vh-100px)] overflow-y-auto"`
- `.core-wrapper.isTryIt` margin overrides → `class="m-[10px]"` with responsive variant

### 3. `src/app/components/cpu-panel/cpu-panel.component.scss`
- `.label` display/font/color/border rules → Tailwind utility classes in template
- `div.flag, div.register` already use `@apply`; move remaining span colour rules to inline Tailwind `bg-[#3f51b5]` / `bg-[#ccc8ca]`

### 4. `src/app/components/display-cockpit/display-cockpit.component.scss`
- `.panel-list` → `class="w-[350px] max-w-full border border-[#ccc] min-h-[35px] flex flex-row bg-white rounded-[22px] overflow-hidden"`
- `.panel-box` → `class="px-5 py-1.5 pl-2.5 text-black/87 flex border-r border-[#ccc] flex-row items-center justify-between box-border cursor-move bg-white text-sm grow basis-0"`
- `.cdk-drag-preview` → `class="box-border rounded-[22px] shadow-lg"` (CDK classes may need `@apply` in global scss)
- `.cdk-drag-placeholder` → keep in global scss (CDK host element, not easily reachable from template)
- `.cdk-drag-animating` → keep in global scss (`transition` on CDK host)

### 5. `src/app/components/memory/memory.scss`
- `div.memory { max-width: 28vw }` → `class="max-w-[28vw]"` with responsive override
- `div.row { display: flex; flex-wrap: wrap; margin: 0 }` → `class="flex flex-wrap m-0"`
- `span.cell` → `class="relative bottom-0 inline-block min-w-[30px] h-[17px] m-0.5 p-[3px] text-[11px] leading-none border border-[#3b3b3b] text-black rounded-[3px] text-center"`

### 6. `src/app/components/navbar/nav-bar.component.scss`
- `.nav-bar` position/z-index → already applied via Tailwind in sibling HTML files; keep Angular-Material toolbar class
- `.example-spacer { flex: 1 1 auto }` → `class="flex-auto"` in template
- `div.record-name` hover border → `class="border border-transparent hover:border-[#b0b0b0]"`
- `input.record-name` border/outline → `class="border border-white outline-none"`
- `.button-icon` responsive margin → `class="max-sm:-mx-[5px]"`

### 7. `src/app/styles/app-styles.scss`
- `.nav-bar-spacer` (duplicate of core) → consolidate with section 2 (`src/app/components/core/core-app.component.scss`)
- `.small-icon-button` size/display overrides for Material button → keep in scss (requires `!important` overrides on Material component host)
- `li { display: list-item }` → can be removed if Tailwind base reset is in place

### 8. `src/app/layout/layout.component.scss`
- `.loading-container` flex/padding/min-height → `class="flex flex-col items-center justify-center py-16 min-h-[300px]"`
- `.loading-text { margin-top: 1rem; font-size: 1rem; color: #666 }` → `class="mt-4 text-base text-[#666]"`
- `.custom-scroll-margins { scroll-margin: 300px }` → `class="scroll-mt-[300px]"`

### 9. `src/app/components/pages/content-table/content-table.component.scss`
- `.example-tree-invisible` → `class="hidden"`
- `.example-tree` `padding-left: 40px` on nested nodes → `class="pl-10"`
- `.app-tree-node` border-radius/transition/padding/cursor/hover → `class="rounded-[40px] transition-colors duration-200 ease-in-out px-5 py-2.5 cursor-pointer hover:bg-gray-100/55"`
- `.mat-icon-rtl-mirror` transition/open rotation → keep `@apply` or move to template with conditional class

## What Cannot Be Migrated

- **Angular Material overrides** (`.mdc-evolution-chip__*`, `.mat-mdc-*`): These target Shadow DOM parts of Material components and require host-level SCSS.
- **CDK drag-drop global classes** (`.cdk-drag-placeholder`, `.cdk-drag-animating`, `.cdk-drop-list-dragging`): Applied by CDK at runtime to host elements; must stay in component or global scss.
- **ACE/CodeMirror editor theme classes** (`.asm-editor .asm_*`): Third-party editor token classes; cannot be replaced with Tailwind.
- **Scrollbar pseudo-elements** (`::-webkit-scrollbar*`): Not supported by Tailwind utilities; keep in `scroll-bar.scss`.
- **`!important` Material overrides** in `.small-icon-button`: Require css specificity hacks; keep in scss.
- **`::ng-deep` selectors**: Targeting child component internals; cannot be done via template classes.

## Steps

1. For each file listed above, replace scss rules with Tailwind classes directly in the HTML template
2. Where `@apply` is cleaner (reused multi-class groups), use `@apply` inside the scss file instead of inlining
3. Delete empty scss files or scss rules that have been fully migrated
4. Run `npm run build` — verify no compilation errors
5. Run `npm test` — verify all existing tests pass
6. Visual smoke-test: confirm layout, memory panel, CPU panel, navbar, and editor all render correctly

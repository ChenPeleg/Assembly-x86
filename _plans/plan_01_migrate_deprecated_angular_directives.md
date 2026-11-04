# Plan 1: Migrate Deprecated Angular Directives

## Objective
Identify and replace all deprecated Angular template directives and APIs with their modern equivalents.
The project is on Angular 20; the following patterns are legacy holdovers from the Angular 15 era.

---

## Static Analysis — How to Find Deprecated Patterns

### Step 1 — Add `@angular-eslint` (one-time setup)
The project has no ESLint config. Add it to enable ongoing static analysis:
```powershell
npx ng add @angular-eslint/schematics
```
Then run a lint pass to see all violations:
```powershell
npx eslint "src/**/*.{ts,html}"
```
Key rules that surface deprecated patterns:
| Rule | What it catches |
|---|---|
| `@angular-eslint/template/prefer-control-flow` | `*ngIf`, `*ngFor`, `*ngSwitch` usage |
| `@angular-eslint/prefer-standalone` | `NgModule` declarations |
| `@angular-eslint/no-input-rename` | `@Input` aliasing anti-patterns |

### Step 2 — Dry-run Angular migration schematics
Use `--dry-run` to audit what would change without writing anything:
```powershell
npx ng generate @angular/core:control-flow --defaults --dry-run
npx ng generate @angular/core:standalone --defaults --dry-run
npx ng generate @angular/core:signal-input-migration --path src --dry-run
npx ng generate @angular/core:output-migration --path src --dry-run
```

### Step 3 — TypeScript compiler for API-level deprecations
```powershell
npx tsc --noEmit
```
Surfaces `@deprecated` JSDoc annotations from Angular's own types (e.g., `enableProdMode`, `EventEmitter` used outside components).

---

## Deprecated Patterns Found (Current Codebase Scan)

### 1. Structural Directives `*ngIf` / `*ngFor` — Deprecated since Angular 17

**Replace with:** built-in control flow (`@if`, `@for`, `@switch`)

Files and occurrences:

| File | Directive | Count |
|---|---|---|
| `src/app/layout/layout.component.html` | `*ngIf` | 1 |
| `src/app/components/pages/documentation/documentation.component.html` | `*ngIf` | 4 |
| `src/app/components/navbar/nav-bar.component.html` | `*ngIf`, `*ngFor` | 6 + 1 |
| `src/app/components/memory-options/memory-options.component.html` | `*ngIf` | 1 |
| `src/app/components/memory/memory.html` | `*ngIf`, `*ngFor` | 1 + 2 |
| `src/app/components/execution/execution.html` | `*ngFor` | 1 |
| `src/app/components/display-cockpit/display-cockpit.component.html` | `*ngIf` | 1 |
| `src/app/components/core/core-app.component.html` | `*ngIf` | 2 |

**Migration schematic (auto-fixes all at once):**
```powershell
npx ng generate @angular/core:control-flow
```

**Before / After example (`*ngIf` with `as`):**
```html
<!-- Before -->
<div *ngIf="(uiState$ | async)?.panels as panels"> ... </div>

<!-- After -->
@if ((uiState$ | async)?.panels as panels) { <div> ... </div> }
```

**Before / After example (`*ngFor`):**
```html
<!-- Before -->
<button *ngFor="let record of recordList" ...>

<!-- After -->
@for (record of recordList; track record) { <button ...> }
```

> **Note:** After migrating, `CommonModule` imports can be removed from any module/component that no longer uses `NgIf`, `NgFor`, `NgSwitch`.

---

### 2. `@Input()` / `@Output()` / `EventEmitter` Decorators — Deprecated in Angular 17.1+

**Replace with:** signal-based `input()`, `output()`, `model()` functions from `@angular/core`

Files:

| File | Pattern |
|---|---|
| `src/app/components/memory/memory.ts` | `@Input() memory`, `@Input() wordSize`, `@Input() width`, `@Input() set valueType` |
| `src/app/components/execution/execution.ts` | `@Input()`, `@Output()`, `EventEmitter` |
| `src/app/components/pages/content-table/content-table.component.ts` | `@Output() contentTableItemClicked: EventEmitter<DocElement>` |

**Migration schematics (auto-fixes):**
```powershell
npx ng generate @angular/core:signal-input-migration --path src
npx ng generate @angular/core:output-migration --path src
```

**Before / After example:**
```typescript
// Before
@Input() memory: MemoryBlock | undefined = null;
@Output() contentTableItemClicked = new EventEmitter<DocElement>();

// After
memory = input<MemoryBlock | undefined>(undefined);
contentTableItemClicked = output<DocElement>();
```

> **Note:** Signal inputs are read as functions — `this.memory` becomes `this.memory()` in the component class.

---

### 3. `NgModule`-Based Architecture — Soft-deprecated since Angular 17

**Replace with:** standalone components, directives, and pipes

Files:

| File | Role |
|---|---|
| `src/app/app.module.ts` | Root `AppModule` with `BrowserModule`, `FormsModule` |
| `src/app/app.routing.module.ts` | `AppRoutingModule` |
| `src/app/common/shared.module.ts` | `SharedModule` |

**Migration schematic:**
```powershell
npx ng generate @angular/core:standalone
```
Run it three times, selecting a different mode each pass:
1. **Convert components** — makes each component/directive/pipe standalone
2. **Remove unnecessary NgModules** — deletes modules that only wrap standalone things
3. **Bootstrap** — updates `main.ts` to use `bootstrapApplication()` instead of `bootstrapModule()`

**Before / After (`main.ts` bootstrap):**
```typescript
// Before (NgModule)
platformBrowser().bootstrapModule(AppModule);

// After (standalone)
bootstrapApplication(AppRootComponent, appConfig);
```

---

### 4. `enableProdMode()` — Deprecated in Angular 15+

**File:** `src/main.ts`

`enableProdMode()` is a no-op in Angular's production builds (the build tool handles it). The call and import should be removed.

```typescript
// Before
import { enableProdMode } from "@angular/core";
if (environment.production) { enableProdMode(); }

// After — delete both lines entirely
```

---

### 5. `EventEmitter` Outside Component `@Output` — Misuse Pattern

**File:** `src/app/emulation/cpu.ts`

`EventEmitter` is an Angular-specific class intended only for component `@Output` bindings. It is misused here as a generic event bus inside a plain class (`CPU`). 

**Replace with:** RxJS `Subject` (already a project dependency)

```typescript
// Before
import { EventEmitter } from "@angular/core";
private _onInterrupt: EventEmitter<Interrupt> = new EventEmitter<Interrupt>();

// After
import { Subject } from "rxjs";
private _onInterrupt = new Subject<Interrupt>();
```

---

## Recommended Execution Order

1. **Add ESLint** → `npx ng add @angular-eslint/schematics` (enables ongoing enforcement)
2. **Migrate control flow** → `npx ng generate @angular/core:control-flow` (highest impact, safest schematic)
3. **Remove `enableProdMode()`** in `src/main.ts` (trivial, manual)
4. **Fix `EventEmitter` in `cpu.ts`** → replace with `Subject` (manual, small change)
5. **Migrate `@Input`/`@Output`** → signal input/output schematics (check for template access pattern changes)
6. **Migrate to standalone** → `ng generate @angular/core:standalone` (largest refactor, do last)

After each step: `npm run build` and `npm test` to verify 49/49 tests still pass.

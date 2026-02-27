# Plan: Remove NgRx and Replace with Vanilla RxJS

## Objective
Remove `@ngrx/store` and `@ngrx/entity` from the project and replace the three managed stores (code-editor, memory-display, ui-state) with plain RxJS `BehaviorSubject`-based services.

## Steps

1. **Create RxJS store services**
   - `src/app/services/code-editor-store.service.ts` — wraps code-editor state in a `BehaviorSubject`; exposes `state$`, `setCode()`, `updateSavedRecordCode()`, `resetCode()`
   - `src/app/services/memory-display-store.service.ts` — wraps memory-display state; exposes `state$`, `setWordSize()`, `setValueType()`
   - `src/app/services/ui-state-store.service.ts` — wraps ui-state; exposes `state$`, `reorder()`, `changeVisibility()`, `resetToDefault()`

2. **Update consumers**
   - Replace all `Store.dispatch(action)` calls with the matching service method calls
   - Replace all `Store.select(selector)` / `store.pipe(select(...))` calls with the matching service `state$` observable (or a derived observable via `map`)
   - Affected files:
     - `src/app/components/core-app/core-app.component.ts`
     - `src/app/components/display-cockpit/display-cockpit.component.ts`
     - `src/app/components/memory-options/memory-options.component.ts`
     - `src/app/components/memory/memory.ts`
     - `src/app/components/documentation/documentation.component.ts`
     - `src/app/components/code-editor/code-editor.component.ts`

3. **Remove NgRx store configuration**
   - Remove `StoreModule.forRoot(...)` from `src/app/app.module.ts`
   - Remove NgRx imports from `AppModule`

4. **Delete old store files**
   - Delete `src/app/stores/actions/`
   - Delete `src/app/stores/reducers/`
   - Delete `src/app/stores/` (if empty)

5. **Uninstall NgRx packages**
   - `npm uninstall @ngrx/store @ngrx/entity`
   - Remove corresponding entries from `package.json` and `package-lock.json`

6. **Verify**
   - Run `npm run build` — no compilation errors
   - Run `npm test` — all existing tests pass
   - Manual smoke-test: editor, memory display options, and panel layout/visibility all work correctly

# Plan: Fix "Try Me" Button in Documentation Pages

## Problem

The "Try me" button on documentation pages sometimes fails to load the code example into the emulator. The mechanism works by:

1. Converting markdown code blocks to HTML with injected `<button class="run-code">Try me</button>` elements
2. Attaching click event listeners via `Renderer2` after the content renders
3. On click, navigating to the same page with `?tryIt=exm_N` query parameter
4. Loading the matching code example into the editor

## Root Cause Analysis

### Bug 1 — Timing / race condition between `isLoadingContent` and `setupCodeExamples`

**File:** `documentation.component.ts` — `loadDocumentsContent()`

```
isLoadingContent = true          ← content div removed from DOM (*ngIf)
this.content = newContent
await sleep(300)
await setupCodeExamples(docId)   ← queries DOM for buttons — but content is HIDDEN
isLoadingContent = false          ← content div appears — buttons have NO listeners
```

The template uses `*ngIf="!isLoadingContent"` to toggle between a spinner and the content. Because `isLoadingContent` is `true` during `setupCodeExamples`, Angular removes the content `<div>` from the DOM. `querySelectorAll("button.run-code")` finds nothing, so no click listeners are attached and `this.codeExamples` is set to an empty array.

**Why it "sometimes" works:** When the same page is revisited (e.g., clicking "Try me" navigates with a query param), `loadDocumentsContent` performs a `SafeHtml` `toString()` comparison. If the content matches (same page), it returns early without re-setting `isLoadingContent` or re-running `setupCodeExamples`, so listeners from a previous successful setup survive. The failure occurs on first load or when the content comparison fails.

### Bug 2 — Fragile `composedPath()[1]` in click handler

**File:** `documentation.component.ts` — `tryItButtonClicked()`

```typescript
const path = $event.composedPath();
const codeBlock = path[1] as HTMLDivElement;
```

This assumes `path[0]` is always the `<button>` and `path[1]` is always the `<div class="code-block">`. If the button ever contains child elements (e.g., an icon, a `<span>`, styled text), the click target shifts and `path[1]` becomes the button itself instead of the code block, yielding an element with no `id` — the navigation proceeds with `tryIt=undefined`.

### Bug 3 — `nextElementSibling` assumption for display options

**File:** `documentation.component.ts` — `setupCodeExamples()`

```typescript
const spanWithData = codeWrapper.nextElementSibling;
const dataComments = spanWithData?.getAttribute("data-comments") || "";
```

The code assumes the `<span data-comments="...">` is always the immediate next DOM sibling of `<div class="code-block">`. This depends on:

- The HTML comment in markdown being placed immediately after the code block
- No other HTML elements being generated between the code block `<div>` and the comment `<span>`
- The paragraph converter not wrapping the comment in a `<p>` tag

When the markdown has extra whitespace, blank lines, or other content between the code fence and the comment, the sibling may be a `<p>`, `<h2>`, `<br>`, etc., and the display options are silently lost.

### Bug 4 — Markdown converter processing order

**File:** `markdownToHtmlConverter.ts` — `convertHtmlToMarkdown()`

Comments (`<!-- ... -->`) are converted to `<span data-comments>` **after** paragraphs. The paragraph converter (line 112) has a guard (`p1.match(/<!--/)`) to avoid wrapping comments, but this only works when the comment is the first element in the paragraph block. If the comment is grouped with other text in the same double-newline-separated block, it may be wrapped in `<p>` tags, and the comment regex then fails to match it correctly.

### Bug 5 — No-op in `findMdCodeBlocks`

**File:** `findMdCodeBlocks.ts` — line 5

```typescript
return (codeBlocks || []).map((t) => t.replace("\n", "\n")).filter((t) => t);
```

`replace("\n", "\n")` replaces a newline with a newline — it does nothing. The original intent was likely `replace(/\n/, "")` (strip the leading newline after the language specifier) or `replaceAll("\n", "")` (strip all newlines). While not directly causing failures, it indicates an incomplete fix in the code block extraction pipeline.

---

## Proposed Solutions

### Solution A — Move `setupCodeExamples` after `isLoadingContent` is set to `false`, use `setTimeout` or `afterNextRender`

Move the DOM setup after the content is actually visible in the DOM.

```
this.content = newContent;
isLoadingContent = false;          // content becomes visible
await sleep(0);                    // yield to Angular change detection
await setupCodeExamples(docId);    // DOM now contains buttons
```

Or use Angular's `afterNextRender` / `ChangeDetectorRef.detectChanges()` to guarantee the DOM is ready.

**Pros:**
- Minimal code change (move two lines)
- Directly addresses the main timing bug (Bug 1)
- No architectural changes needed

**Cons:**
- Still relies on timing (`sleep`) which is fragile across devices
- Does not fix Bugs 2–4 (fragile path, sibling assumption, processing order)
- `sleep(0)` may not be enough — Angular change detection timing varies

---

### Solution B — Use event delegation instead of per-button listeners

Replace individual `Renderer2.listen()` calls with a single event listener on the parent container that uses `event.target.closest('.run-code')`.

```typescript
this.renderer.listen(
  this.htmlDynamicContent.nativeElement,
  'click',
  (evt: MouseEvent) => {
    const button = (evt.target as HTMLElement).closest('button.run-code');
    if (!button) return;
    const codeBlock = button.closest('.code-block') as HTMLDivElement;
    // use codeBlock.id to find the code example
  }
);
```

And populate `codeExamples` from the markdown source (before DOM rendering) instead of querying the DOM.

**Pros:**
- Completely eliminates the timing bug (Bug 1) — no need to wait for DOM
- Fixes Bug 2 — `closest('.code-block')` is robust regardless of nesting depth
- Single listener is more performant than N listeners
- Works even if buttons are re-rendered (e.g., Angular re-creates `[innerHTML]`)

**Cons:**
- Moderate refactor — must extract code examples from markdown/HTML string instead of DOM
- Event delegation is less "Angular-idiomatic" (but acceptable for dynamically injected HTML)
- The `data-comments` extraction still depends on DOM sibling structure (Bug 3 not fully fixed)

---

### Solution C — Extract code examples and display options during markdown conversion (pre-DOM)

Move all code example extraction into the `MarkdownToHtmlConverter` or a companion utility. Instead of querying the DOM after rendering, parse the markdown string to extract code blocks and their associated comments, then embed the metadata directly into the HTML as `data-*` attributes on the code block `<div>`.

```typescript
// During markdown conversion:
<div class="code-block"
     data-code-id="exm_1"
     data-comments=" console -memory -cpu ">
  <button class="run-code">Try me</button>
  <pre><code>MOV EAX, 1</code></pre>
</div>
```

The component would then:
1. Build `codeExamples` from the markdown during `getContent()` (no DOM needed)
2. Use event delegation for clicks (Solution B)
3. Read `data-code-id` and `data-comments` from the clicked code block

**Pros:**
- Fixes all five bugs — no timing issues, no DOM queries, no fragile sibling/path assumptions
- Single source of truth: markdown → code examples, no dual extraction
- Code examples are available immediately, even before Angular renders
- Makes the `<span data-comments>` element unnecessary (cleaner HTML output)

**Cons:**
- Largest refactor — changes `markdownToHtmlConverter.ts`, `findMdCodeBlocks.ts`, `getContent()`, and `setupCodeExamples()`
- Requires careful regex work to associate comments with their preceding code blocks
- Must handle edge cases: code blocks without comments, multiple code blocks, etc.
- Unit tests for the converter need updating

---

### Solution D — Use Angular `MutationObserver` to attach listeners when content appears

Instead of relying on timing, observe the `#htmlDynamicContent` element for child additions and attach event listeners when buttons appear.

```typescript
ngAfterViewInit() {
  const observer = new MutationObserver(() => {
    this.setupCodeExamples(this.currentDocId);
  });
  observer.observe(this.htmlDynamicContent.nativeElement, {
    childList: true, subtree: true
  });
}
```

**Pros:**
- Fixes Bug 1 — listeners are attached when DOM actually changes
- No sleep/timing hacks
- Works with any content loading mechanism

**Cons:**
- MutationObserver fires on every DOM change (not just content loads), needs debouncing
- Does not fix Bugs 2–4
- Adds complexity and potential performance overhead
- Must be cleaned up on destroy to avoid memory leaks

---

### Solution E — Replace innerHTML injection with Angular dynamic components

Instead of using `[innerHTML]` with `bypassSecurityTrustHtml`, create proper Angular components for code blocks. Use `ViewContainerRef.createComponent()` to dynamically insert `CodeBlockComponent` instances that handle their own "Try me" logic.

**Pros:**
- Full Angular lifecycle support — no timing issues, proper event binding
- Type-safe — no manual DOM queries or event delegation
- Fixes all bugs — each code block component manages its own state
- Better testability — code blocks are unit-testable components

**Cons:**
- Major architectural change — requires a custom markdown renderer that outputs Angular components
- Significantly more code and complexity
- Parsing markdown into a component tree is non-trivial
- Breaks the current simple "markdown → HTML string" pipeline

---

## Recommendation

**Solution C** (extract during conversion) paired with **Solution B** (event delegation) provides the best balance of reliability, scope of fix, and maintainability. It addresses all identified bugs, eliminates timing dependencies, and keeps the existing architecture largely intact. If time is limited, **Solution A** is the quickest fix for the primary timing bug but leaves the other fragilities in place.

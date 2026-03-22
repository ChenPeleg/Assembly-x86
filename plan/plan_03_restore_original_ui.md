# Plan 3: Restore Original UI Appearance After Material → Vanilla CSS Migration

## Objective
Reconcile the current vanilla-CSS build with the original Material UI look shown in
`src/assets/img/quick-start-interface.png`. Focus on colors, button layout/spacing, and font sizes.

## Differences and Steps

1. **Navbar color** — `src/app/components/navbar/nav-bar.component.html`
   - Current: `bg-indigo-700` (#4338ca, purple-leaning).
   - Original: Material Indigo 500 (#3f51b5, cooler blue).
   - Fix: Replace `bg-indigo-700` with an inline style or CSS class using `background-color: #3f51b5`.

2. **Execution icon buttons (Play/Stop/Pause/Continue/Step)** — `src/app/styles/app-styles.css` + `src/app/components/execution/execution.html`
   - Current: Filled colored circles (`btn-primary` = blue, `btn-warn` = red) with white icons.
   - Original: Transparent `mat-icon-button` style — no fill, dark-colored icons, subtle hover ripple.
   - Fix: Change `.execution-btn` to `background: transparent; color: inherit;` with `rgba(0,0,0,0.08)` hover only. Remove `btn-primary` / `btn-warn` modifier classes from `execution.html`.

3. **"Assemble" button** — `src/app/styles/app-styles.css` + `src/app/components/core/core-app.component.html`
   - Current: `btn-raised` with 4px radius is correct, but `min-width` is unset and the label hides on mobile (`hidden md:flex`).
   - Original: Button always shows text "Assemble"; `min-width: 88px`.
   - Fix: Add `min-width: 88px` to `.btn-raised`. Remove the `hidden md:flex` / `flex md:hidden` responsive toggle so the text label is always visible.

4. **Panel tabs font** — `src/app/components/display-cockpit/display-cockpit.component.html`
   - Current: Tab text inherits Poppins; font-weight not explicitly set.
   - Original: Roboto, 14px, font-weight 500 (matching Material button label style).
   - Fix: Add `font-family: Roboto, sans-serif; font-size: 14px; font-weight: 500;` to the tab text element (or rely on global Roboto fix in step 6).

5. **CPU register and flag value badge color** — `src/app/components/cpu-panel/register.html` + `cpu-panel.component.html`
   - Current: Value badge uses `bg-[#ccc8ca]` (warm gray).
   - Original: Material grey-300 (#e0e0e0), a cooler lighter gray.
   - Fix: Change `bg-[#ccc8ca]` → `bg-[#e0e0e0]` on both register value and flag value badge spans.

6. **Global font — restore Roboto** — `src/styles.css`
   - Current: Poppins is loaded and used as the primary font (changes button labels, headers, tab text).
   - Original: Roboto (Angular Material default).
   - Fix: Add `@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');` and set `body { font-family: Roboto, sans-serif; }`. Remove or demote Poppins declarations.

7. **Execution row spacing** — `src/app/components/core/core-app.component.html`
   - Current: `gap-1 md:gap-5` produces a 20px gap between the icon-button cluster and the Assemble button on desktop.
   - Original: Tighter grouping (~8px gap).
   - Fix: Change `gap-5` → `gap-2` on the execution row wrapper.

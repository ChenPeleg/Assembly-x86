# Plan: Optional Documentation Topics

## Objective
Add optional learning material to the documentation using existing emulator features only. No emulator functionality changes are in scope.

## Topics
1. **Guided debugging** — follow a short program with breakpoints, step/continue controls, and CPU, memory, and console panels; explain what to inspect at each pause.
2. **Array search walkthrough** — find a target value and stop at its first match, using existing data declarations, indexed addressing, `CMP`, and conditional jumps.
3. **Debugging challenge** — provide small programs with intentional syntax, operand-size, memory-boundary, or control-flow mistakes; ask readers to diagnose them using the existing error messages and panels.
4. **Data-format comparison** — show how the same byte or word appears in the memory panel's decimal, hexadecimal, binary, and ASCII views, with examples readers can verify.

## Steps
1. Confirm every instruction and UI control used is currently supported; exclude unsupported operations.
2. Write each topic as a short, optional page under `src/assets/documentation/`.
3. Use runnable examples and existing panel directives; verify snippets in the emulator.
4. Add completed pages to `src/assets/documentation/doclist.txt` in a sensible reading order.

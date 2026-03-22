# Plan 4: Add More Documentation

## Objective
Expand the in-app documentation to cover the missing x86 instruction categories, deepen
the existing sections, and add a complete instruction reference so learners progress
from basics through intermediate topics without leaving the emulator.

---

## Current Documentation Gaps

| Topic | Current state | Gap |
|---|---|---|
| Commands / Instructions | Only `05 commands/01 basic-commands.md` | Missing arithmetic, logic, stack, control-flow, string, and I/O groups |
| Procedures & Calling Conventions | Not covered | Needed after registers and stack |
| Stack operations | Mentioned briefly | No dedicated walkthrough |
| Interrupts & I/O | Not covered | Needed for real-world programs |
| Tutorials | `tutorials/tutorials.md` (stub) | No worked examples beyond hello-world |
| Complete instruction reference | Not covered | A cheat-sheet for experienced users |

---

## New Files to Create

All Markdown files live in `src/assets/documentation/`. After adding files, run:
```bash
node script/listAllDocAssestFiles.mjs
```
to regenerate `src/assets/documentation/doclist.txt`.

### 1. Arithmetic Instructions — `05 commands/02 arithmetic-commands.md`
Cover: `ADD`, `SUB`, `MUL`, `IMUL`, `DIV`, `IDIV`, `INC`, `DEC`, `NEG`.

Contents:
- Syntax and operand sizes for each instruction
- How flags (`CF`, `OF`, `ZF`, `SF`) are set after each operation
- Signed vs. unsigned distinction for `MUL`/`DIV`
- Interactive "Try me" code block showing addition, subtraction, and overflow

Example code block to include:
```asm
MOV AX, 10
MOV BX, 3
DIV BX       ; AX = quotient, DX = remainder
```

### 2. Logic & Bitwise Instructions — `05 commands/03 logic-commands.md`
Cover: `AND`, `OR`, `XOR`, `NOT`, `SHL`, `SHR`, `SAL`, `SAR`, `ROL`, `ROR`.

Contents:
- Truth tables for AND / OR / XOR
- Masking and testing bits with AND
- Shifting vs. rotation
- Interactive examples for bit-manipulation tasks

### 3. Control Flow Instructions — `05 commands/04 control-flow-commands.md`
Cover: `JMP`, `JE`/`JZ`, `JNE`/`JNZ`, `JG`, `JL`, `JGE`, `JLE`, `JA`, `JB`, `LOOP`,
`CMP`, `TEST`.

Contents:
- How `CMP` and `TEST` set flags
- Signed vs. unsigned jump mnemonics (JG/JA, JL/JB)
- The `LOOP` counter pattern with `ECX`
- Flowchart diagrams embedded as ASCII art
- Interactive "Try me" loop example

### 4. Stack & Procedures — `05 commands/05 stack-and-procedures.md`
Cover: `PUSH`, `POP`, `CALL`, `RET`, `ENTER`, `LEAVE`.

Contents:
- Stack layout diagram (ASCII art, top-of-stack, ESP/RSP movement)
- Building a stack frame step by step
- Writing and calling a simple procedure
- Preserving registers across calls (caller-saved vs. callee-saved conventions)
- Interactive example: call a subroutine that squares a value

### 5. String Instructions — `05 commands/06 string-commands.md`
Cover: `MOVS`, `CMPS`, `SCAS`, `LODS`, `STOS` and their repeat prefixes `REP`, `REPE`,
`REPNE`.

Contents:
- Direction flag (`DF`), `CLD`, `STD`
- Source index (`SI`/`ESI`) and destination index (`DI`/`EDI`) usage
- Comparing and copying memory blocks
- Interactive example: copy a string with `REP MOVSB`

### 6. Interrupts & Software I/O — `05 commands/07 interrupts-and-io.md`
Cover: `INT`, `IRET`, interrupt vector table concept, DOS/BIOS int 21h/10h examples.

Contents:
- What an interrupt is and how the CPU handles it
- Common software interrupt numbers used in the emulator
- Printing a character with `INT 10h` / emulator console equivalent
- Reading from keyboard (where supported by the emulator)

### 7. Complete Instruction Reference — `06 reference/instruction-reference.md`
A single-page lookup table for all instructions supported by the emulator.

Format:
```
| Instruction | Syntax | Description | Flags affected |
|---|---|---|---|
| MOV | MOV dst, src | Copy value | None |
| ADD | ADD dst, src | Add and store | CF OF SF ZF PF AF |
...
```

Group instructions by category with anchor links at the top.
Link back to the relevant tutorial section for each group.

### 8. Tutorials — Expand `tutorials/` folder

#### `tutorials/01 sum-of-array.md`
- Compute the sum of a hardcoded array using a loop
- Introduces indirect addressing and loop patterns
- "Try me" code block

#### `tutorials/02 fibonacci.md`
- Compute the first N Fibonacci numbers and store in memory
- Reinforces registers, conditionals, and memory writes

#### `tutorials/03 factorial.md`
- Recursive factorial using the stack and `CALL`/`RET`
- Demonstrates stack frames and the call convention

---

## Steps

1. **Create arithmetic commands page**
   - File: `src/assets/documentation/05 commands/02 arithmetic-commands.md`
   - Include at least one interactive "Try me" code block

2. **Create logic & bitwise commands page**
   - File: `src/assets/documentation/05 commands/03 logic-commands.md`

3. **Create control-flow commands page**
   - File: `src/assets/documentation/05 commands/04 control-flow-commands.md`

4. **Create stack & procedures page**
   - File: `src/assets/documentation/05 commands/05 stack-and-procedures.md`

5. **Create string instructions page**
   - File: `src/assets/documentation/05 commands/06 string-commands.md`

6. **Create interrupts & I/O page**
   - File: `src/assets/documentation/05 commands/07 interrupts-and-io.md`

7. **Create `06 reference/` folder and instruction reference**
   - File: `src/assets/documentation/06 reference/instruction-reference.md`

8. **Create tutorials**
   - Files: `src/assets/documentation/tutorials/01 sum-of-array.md`
   - Files: `src/assets/documentation/tutorials/02 fibonacci.md`
   - Files: `src/assets/documentation/tutorials/03 factorial.md`

9. **Regenerate doclist.txt**
   - Run `node script/listAllDocAssestFiles.mjs`
   - Verify new entries appear in `src/assets/documentation/doclist.txt`

10. **Verify in the app**
    - Run `npm start` and navigate to each new page in the documentation section
    - Confirm "Try me" buttons launch the emulator with the correct code
    - Run `npm run build` and `npm run test:ci` to confirm no regressions

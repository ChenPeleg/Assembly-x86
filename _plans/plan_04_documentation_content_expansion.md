# Plan: Documentation Content Expansion

Status: implemented in the documentation expansion PR (pages in `src/assets/documentation/`).

## 1. Current documentation (findings)

- Pages live in `src/assets/documentation/`, ordered by `doclist.txt` (`/folder/file.md <>`).
- Style: short pages, plain-English intro, then one small runnable snippet per concept.
- Snippets are ```` ```shell ```` blocks followed by a layout directive such as `<!-- -console -memory cpu word:1 ascii -->`
  that chooses which panels (console / memory / cpu) open next to the editor. `<!-- info -->` / `<!-- notice -->`
  render callouts.
- Progression: quickstart → 01 basics (hello world, binary, hex, syntax, registers, memory) → 02 binary numbers
  (positional systems, overflow, negatives) → 03 registers (word size, flags) → 05 commands.
- Weak spots to fix first:
  - `04 registers part 2/` duplicates `03 registers/` (3 identical files) and is missing from `doclist.txt`.
  - `05 commands/01 basic-commands.md` is copied NASM/Linux text (`global _start`, `.bss`) the emulator does not
    support; `03 registers` copy discusses RAX/64-bit and `movzx`.
  - `03 registers/flags.md` and `memory-size.md` (205 bytes) are thin; `tutorials/tutorials.md` is a 57 KB dump.
  - `01 basics/10 hello world advanced.md` has no explanation.

## 2. Emulator capabilities (source of truth: `src/app/assembly/asm-parser.pegjs`, `src/app/emulation/`)

| Area | Supported |
|---|---|
| Sections | `section .data` (`db`/`dw`/`dd`, numbers, strings, labels), `section .text`; `;` comments; local labels `.name` |
| Data move | `MOV`, `PUSH`, `POP` (`MOVSX` parses but has no implementation) |
| Arithmetic | `ADD ADC SUB SBB INC DEC IMUL IDIV` (single-operand, use EAX/EDX). `MUL`/`DIV` parse but have no implementation |
| Logic | `AND OR XOR` |
| Compare | `CMP` |
| Jumps | `JMP`, `Jcc` aliases (E/Z, NE/NZ, B/C/NAE, AE/NC/NB, A, NA, L/NGE, GE/NL, NG, G, S, NS, O, NO, P, NP) and `LOOP`. `JBE`, `JLE`, `JNBE`, `JNLE`, `JPE`, `JPO`, `JCXZ`, `JECXZ` are listed in the grammar but shadowed by shorter prefixes, so they don't assemble |
| Procedures | `CALL`, `RET`, `ENTER`, `LEAVE` (args via `[EBP + 8]`) |
| Flags | CF, ZF, OF, SF, PF, DF; `CLC STC CLD STD` |
| Registers | 32-bit `EAX EBX ECX EDX ESI EDI EBP ESP EIP`; 16-bit `AX BX CX DX SI DI`; 8-bit `AH AL BH BL CH CL DH DL` |
| Addressing | `[reg]`, `[reg + reg*scale + disp]`, `[label + …]`, `[number]`, size casts (`byte/word/dword`) |
| Memory | Flat byte array, size chosen in the UI; plain numbers are 32-bit (`MOV AL, byte 5`), numbers are decimal or `0x` hex, `[label + reg*scale]` needs the scale; ESP/EBP start at the top; out-of-range access raises a runtime error |
| I/O | `INT 1` prints number in EAX, `INT 2` prints string at address EAX (console panel). No input. |
| Misc | `HLT`; "Division by zero" runtime exception |

## 3. Gaps between desired topics and emulator support

| Desired topic | Status | Doc handling |
|---|---|---|
| `NOT`, `NEG`, `TEST`, `SHL/SHR/SAR`, `ROL/ROR` | Not supported | Mention as "not in the emulator"; teach via `AND/OR/XOR`, `MUL`, `DIV` |
| `LEA`, `XCHG`, `NOP`, `MOVZX`, `CBW/CDQ` | Not supported | Omit; note `MOVSX` is available |
| String ops (`MOVS/LODS/STOS/REP`) | Not supported (`CLD/STD` only toggle DF) | Explain DF briefly; no string-op lessons |
| 64-bit regs, segment regs, EFLAGS register, AF flag | Not supported | Remove 64-bit/RAX text from `03 registers` or label "real CPUs only" |
| 16-bit `SP`, `BP` | Not registers here | Keep out of cheatsheet |
| Keyboard input, files, syscalls, `.bss`, `global _start`, `equ`, `times`, `resb` | Not supported | Rewrite `05 commands`; list under "Differences from NASM" |
| `PUSHAD/POPAD`, `PUSHF/POPF` | Not supported | Omit |
| Interrupts other than 1 and 2 | Not supported | Document only 1 and 2 |

Re-verify each gap against the parser before writing the matching page; if a gap closes, update the page and this table.

## 4. Delivered page structure (existing numbering kept)

Each page: ≤ ~60 lines, one idea, 1–3 snippets with a layout directive, a "Try it" tweak, link to next page.

1. [x] **Housekeeping**: delete `04 registers part 2/`; fix `doclist.txt`; rewrite `05 commands/01 basic-commands.md`
   for this emulator; trim 64-bit/`movzx` content in `03 registers`; explain `10 hello world advanced`.
2. [x] **03 registers** (extend): `flags.md` with one snippet per flag (CF, ZF, OF, SF, PF) using `-memory cpu`;
   `memory-size.md` expanded (byte/word/dword, `db/dw/dd`, little-endian, casts).
3. [x] **05 commands → Instruction reference** (one page per group, syntax table + snippet):
   data movement (`MOV`, `MOVSX`, `PUSH`, `POP`); add/sub/inc/dec then `ADC/SBB`; `MUL/IMUL/DIV/IDIV` with EDX:EAX
   and division-by-zero; logic and masks (`AND/OR/XOR`, zeroing a register); `CMP` and flags; jumps with a
   signed-vs-unsigned `Jcc` table; loops (`LOOP`) with a note that `JCXZ`/`JECXZ` are unsupported.
4. [x] **06 memory & data** (new): `.data` declarations, labels, addressing modes (`[reg+reg*4+disp]`), arrays,
   strings with `INT 2`, bounds errors, memory-size selector.
5. [x] **07 stack & procedures** (new): stack growth via `ESP`, `PUSH/POP`, `CALL/RET`, `ENTER/LEAVE`, args via
   `[EBP + 8]`, step-through of the factorial example.
6. [x] **08 I/O** (new): `INT 1`, `INT 2`, string terminators (`10`, `0`); explicit "no input" note.
7. [x] **09 practice programs** (new): sum 1..N, max of array, string length, fibonacci, GCD, reverse string — each
   with goal, starter snippet, expected console output.
8. [x] **Appendix**: instruction cheat sheet (from section 2), emulator-vs-real-x86 differences (section 3),
   common errors, glossary. Fold in or retire `tutorials/tutorials.md`.

## 5. Conventions for new pages

- Match existing tone: second person, short sentences, callouts for caveats.
- Every snippet must assemble and run in the emulator; verify before commit.
- Pick the panel directive by lesson: registers → `cpu`; data → `memory`; output → `console`.
- Add each new file to `doclist.txt` in reading order.
- Use only features from section 2; flag anything else with `<!-- notice -->`.

## 6. Delivery order

[x] Housekeeping → registers/flags → instruction reference → memory → stack/procedures → I/O → practice programs →
appendix. One PR each, checked manually with `npm start` (pages render, snippets run).

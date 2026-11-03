# Emulator vs real x86

| Real x86 feature                                   | In this emulator                          |
|----------------------------------------------------|-------------------------------------------|
| `NOT` `NEG` `TEST` `SHL` `SHR` `SAR` `ROL` `ROR`   | not supported                             |
| `LEA` `XCHG` `NOP` `MOVZX` `CBW` `CDQ`             | not supported                             |
| `MUL` `DIV` `MOVSX` `JCXZ` `JECXZ`                 | parsed, but not working yet               |
| Binary (`0b101`), `h` suffix, `'A'` as a number    | decimal and `0x` hex only                 |
| `MOVS` `LODS` `STOS` `REP`                         | not supported; `CLD`/`STD` only toggle DF |
| 64-bit registers, segment registers, `EFLAGS`, AF  | not supported                             |
| `SP`, `BP` 16-bit registers                        | not available                             |
| `PUSHAD` `POPAD` `PUSHF` `POPF`                    | not supported                             |
| `global _start`, `.bss`, `equ`, `times`, `resb`    | not supported                             |
| System calls, keyboard, files                      | none: only `INT 1` and `INT 2`            |
| Memory                                             | flat byte array, size chosen in the UI    |

<!-- info -->
> Programs written here teach the ideas of x86, but need changes to assemble with NASM on a real system.

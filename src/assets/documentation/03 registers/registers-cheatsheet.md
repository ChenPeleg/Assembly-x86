# Registers cheat sheet

## General purpose

| Register | Parts                    | Typical use                                              |
|----------|--------------------------|----------------------------------------------------------|
| `EAX`    | `AX`, `AH`, `AL`         | Accumulator: default for `MUL`, `DIV`, `INT` arguments   |
| `EBX`    | `BX`, `BH`, `BL`         | Base address when addressing memory                      |
| `ECX`    | `CX`, `CH`, `CL`         | Counter for `LOOP`                                       |
| `EDX`    | `DX`, `DH`, `DL`         | Extra data; holds the remainder after `DIV`              |
| `ESI`    | `SI`                     | Source index (used as a general register here)           |
| `EDI`    | `DI`                     | Destination index (used as a general register here)      |

## Special

| Register | Meaning                                                                 |
|----------|-------------------------------------------------------------------------|
| `EIP`    | Address of the next instruction. Changes by itself, you can't `MOV` to it |
| `ESP`    | Stack pointer: top of the stack. Starts at the end of memory            |
| `EBP`    | Base pointer: frame pointer used inside procedures (`ENTER`/`LEAVE`)    |

## Sizes

- `AL`, `AH`, ... : byte (8 bits)
- `AX`, `BX`, ... `SI`, `DI`: word (16 bits)
- `EAX`, `EBX`, ... : double word (32 bits)

<!-- notice -->
> `SP`, `BP`, 64-bit registers (`RAX`...) and segment registers are not available in this emulator.

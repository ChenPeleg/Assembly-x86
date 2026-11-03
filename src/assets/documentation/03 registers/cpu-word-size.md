# Register sizes

Older CPUs worked with 16-bit values, newer ones with 32 bits. This emulator models a 32-bit CPU, so every general
register has a 32-bit name and smaller parts you can use on their own.

| CPU     | Word size |
|---------|-----------|
| 8086    | 16 bits   |
| 80286   | 16 bits   |
| 80386   | 32 bits   |
| 80486   | 32 bits   |
| Pentium | 32 bits   |

## Parts of a register

`EAX` is the full 32-bit value. `AX` is its lower 16 bits, `AL` is the lower 8 bits and `AH` is bits 8 through 15.
The same applies to `EBX`, `ECX` and `EDX`. `ESI`, `EDI` have a 16-bit part (`SI`, `DI`) but no 8-bit parts.

```shell
section .text
    MOV EAX, 0
    MOV AL, byte 255 ; fills only the lowest byte
    MOV AH, byte 1   ; fills the second byte
    INT 1          ; prints 511
```
<!-- -console -memory cpu -->

Writing `AL`, `AH` or `AX` leaves the other bytes of `EAX` unchanged.

```shell
section .text
    MOV EAX, 0x11223344
    MOV AX, word 0  ; EAX is now 0x11220000
    MOV BL, byte 7  ; only the low byte of EBX changes
```
<!-- -console -memory cpu -->

<!-- info -->
> Real 64-bit CPUs also have `RAX`, `RBX`, ... This emulator does not: it has no 64-bit registers.

<!-- notice -->
> A plain number is 32 bits wide, so for smaller registers write its size: `byte 5` or `word 5`.

**Try it:** change `MOV AX, 0` to `MOV EAX, 0` and watch the whole register clear.

# Program structure

An emulator program has two sections.

## `section .data`

Declares initialized data with `db` (bytes), `dw` (words) and `dd` (double words). Numbers, strings and several values
separated by commas are allowed. A label names the address of the data.

## `section .text`

Contains the instructions. Execution starts at the first one and stops at `HLT` or after the last instruction.

```shell
section .data
msg: db 'Hi!', 10, 0
section .text
    MOV EAX, msg   ; address of the string
    INT 2          ; print it
    HLT
```
<!-- console memory -cpu word:1 ascii -->

## Comments and labels

A comment starts with `;`. Labels end with `:`. A label that starts with `.` is local to the label above it.

```shell
section .text
    MOV ECX, 3     ; counter
start:
    DEC ECX
    JNZ start      ; repeat
```
<!-- -console -memory cpu -->

<!-- notice -->
> Differences from NASM: there is no `global _start`, `section .bss`, `equ`, `times` or `resb`, and no system calls.
> Programs end with `HLT` or by running out of instructions.

Next: the instruction reference, starting with *Data movement*.

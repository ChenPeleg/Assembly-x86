# Data and labels

Declare data in `section .data`. A label gives the data a name; using the label as a value gives its **address**,
using `[label]` gives the **contents**.

```shell
section .data
    x: dd 42
    bytes: db 1, 2, 3, 4
    text: db 'Hello', 0
section .text
    MOV EAX, x       ; the address of x
    MOV EBX, [x]     ; the value 42
    MOV CL, byte [bytes] ; 1
```
<!-- -console memory cpu word:1 -->

- `db` bytes, `dw` words, `dd` double words. Strings are in quotes.
- Data is placed in memory in the order it is declared, starting at address 0.

## Changing memory

```shell
section .data
    counter: dd 0
section .text
    MOV EAX, [counter]
    ADD EAX, 5
    MOV [counter], EAX
    ADD dword [counter], 1   ; operate directly on memory
```
<!-- -console memory cpu word:4 -->

Use `byte`, `word` or `dword` when no register tells the size.

## Memory size and errors

The memory size is picked in the UI. `ESP` and `EBP` start at the top. Reading or writing outside memory stops the
program with a runtime error.

```shell
section .text
    MOV EAX, 100000
    MOV EBX, [EAX]   ; outside memory: runtime error
```
<!-- -console memory cpu -->

**Try it:** make the memory bigger in the UI and run again.

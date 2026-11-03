# Data sizes

| Name                | Size    | Unsigned range  | Declared with |
|---------------------|---------|-----------------|---------------|
| Bit                 | 1 bit   | 0 - 1           |               |
| Nibble              | 4 bits  | 0 - 15          |               |
| Byte                | 8 bits  | 0 - 255         | `db`          |
| Word                | 16 bits | 0 - 65,535      | `dw`          |
| Double word (DWORD) | 32 bits | 0 - 4,294,967,295 | `dd`        |

## Declaring data

```shell
section .data
    a: db 10
    b: dw 1000
    c: dd 100000
section .text
    MOV EAX, 0
    MOV AL, byte [a]      ; reads 1 byte
    MOV BX, word [b]      ; reads 2 bytes
    MOV ECX, [c]     ; reads 4 bytes
```
<!-- -console memory cpu word:1 -->

`byte [a]` reads 1 byte, `word [b]` 2 bytes, and a bare `[c]` (or a `dword`) 4 bytes.

## Little endian

x86 stores the **least significant byte first**. The word `0x1234` is stored as `34 12`.

```shell
section .data
    value: dd 0x11223344
section .text
    MOV AL, byte [value]   ; AL = 0x44, the first byte in memory
```
<!-- -console memory cpu word:1 hex -->

## Size casts

When the size can't be guessed from a register, state it with `byte`, `word` or `dword`.

```shell
section .data
    n: dd 0
section .text
    MOV byte [n], byte 255
    MOV word [n], word 65535
    MOV dword [n], 1
```
<!-- -console memory -cpu word:1 -->

**Try it:** change the memory view to 2 or 4 bytes per cell and see how the same data reads differently.

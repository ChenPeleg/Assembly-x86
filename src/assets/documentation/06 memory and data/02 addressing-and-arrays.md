# Addressing and arrays

Square brackets read memory. The address can combine up to four parts:

`[base + index*scale + displacement]`

- base is a register or label, index is a register **with** a scale (`ESI*4`, even `*1`), displacement is a number.

```shell
section .data
    nums: dd 10, 20, 30, 40
section .text
    MOV EAX, 0
    MOV EBX, 2
    MOV EAX, [nums + EBX*4]   ; third element: 30
    INT 1
```
<!-- console memory cpu word:4 -->

The scale equals the element size: 4 for `dd`, 2 for `dw`, 1 for `db`.

## Walking through an array

```shell
section .data
    nums: dd 3, 1, 4, 1, 5
section .text
    MOV EAX, 0         ; sum
    MOV ESI, 0         ; index
    MOV ECX, 5
sum:
    ADD EAX, [nums + ESI*4]
    INC ESI
    LOOP sum
    INT 1              ; prints 14
```
<!-- console memory cpu word:4 -->

## Pointers

A register can hold an address.

```shell
section .data
    nums: dw 7, 8, 9
section .text
    MOV EBX, nums
    MOV AX, word [EBX]   ; 7
    MOV AX, word [EBX + 2] ; 8
    MOV AX, word [EBX + 4] ; 9
```
<!-- -console memory cpu word:2 -->

## Strings

A string is an array of bytes ending with 0.

```shell
section .data
    s: db 'abc', 0
section .text
    MOV EBX, s
    MOV AL, byte [EBX]   ; 97 = 'a'
    MOV byte [EBX], byte 65 ; change the first letter to 'A'
    MOV EAX, s
    INT 2                ; prints Abc
```
<!-- console memory cpu word:1 ascii -->

**Try it:** change the loop above to find the largest number instead of the sum.

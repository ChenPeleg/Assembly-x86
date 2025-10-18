# Data Movement Instructions

Complete reference for moving data between registers, memory, and immediate values.

## MOV - Move Data

Copies data from source to destination.

**Syntax:** `MOV destination, source`

### Register to Register
```shell
section .text
    MOV AX, BX           ; Copy BX to AX
    MOV AL, BL           ; Copy BL to AL
    INT 3
```
<!-- console cpu --> 

### Immediate to Register
```shell
section .text
    MOV AX, 100          ; Load immediate value
    MOV BL, 0xFF         ; Hexadecimal
    MOV CL, 0b11001100   ; Binary
    INT 3
```
<!-- console cpu --> 

### Memory to Register
```shell
section .data
value: db 42

section .text
    MOV AL, [value]      ; Load from memory
    MOV AH, 0
    INT 3
```
<!-- console cpu memory --> 

### Register to Memory
```shell
section .data
result: db 0

section .text
    MOV AL, 99
    MOV [result], AL     ; Store to memory
    INT 3
```
<!-- console cpu memory --> 

## XCHG - Exchange Data

Swaps values between two operands.

```shell
section .text
    MOV AX, 100
    MOV BX, 200
    XCHG AX, BX          ; Swap: AX=200, BX=100
    INT 3                ; Print AX (200)
```
<!-- console cpu --> 

## Practical Examples

### Copy Array Elements

```shell
section .data
src: db 10, 20, 30, 40, 50
dst: db 0, 0, 0, 0, 0

section .text
    MOV CX, 5            ; Count
    MOV SI, 0            ; Index
copy_loop:
    MOV AL, [src + SI]
    MOV [dst + SI], AL
    INC SI
    LOOP copy_loop
    MOV AL, [dst + 2]    ; Show element 3
    MOV AH, 0
    INT 3
```
<!-- console cpu memory --> 

## Summary

Data movement instructions are fundamental to all assembly programming!

# Data movement

| Instruction      | Meaning                                         |
|------------------|-------------------------------------------------|
| `MOV dst, src`   | copy `src` to `dst`                             |
| `PUSH src`       | decrease `ESP` by 4, store `src` on the stack   |
| `POP dst`        | load from the stack into `dst`, increase `ESP`  |

`MOV` can't copy memory to memory, and both operands must be the same size.

```shell
section .text
    MOV EAX, 10
    MOV EBX, EAX     ; EBX = 10
    MOV ECX, 0
    MOV CL, byte 200 ; only the low byte of ECX
```
<!-- -console -memory cpu -->

<!-- info -->
> A plain number is 32 bits wide. To put it in a smaller register, say its size: `MOV AL, byte 5`, `MOV AX, word 5`.

## PUSH and POP

```shell
section .text
    PUSH 1
    PUSH 2
    POP EAX          ; EAX = 2 (last in, first out)
    POP EBX          ; EBX = 1
```
<!-- -console memory cpu -->

**Try it:** swap two registers using only `PUSH` and `POP`.

<!-- notice -->
> `XCHG`, `LEA`, `MOVZX` and `NOP` are not supported. `MOVSX` is recognized, but is not implemented yet.

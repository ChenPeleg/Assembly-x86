# Multiply and divide

The signed instructions take one operand and work with `EAX` and `EDX`.

| Instruction | Result                                                           |
|-------------|------------------------------------------------------------------|
| `IMUL src`  | `EDX:EAX = EAX * src` (signed)                                   |
| `IDIV src`  | `EAX = EDX:EAX / src`, `EDX = remainder` (signed)                |

`EDX:EAX` is a 64-bit number: `EDX` holds the upper 32 bits.

```shell
section .text
    MOV EAX, 6
    MOV EBX, 7
    IMUL EBX         ; EAX = 42
    INT 1
```
<!-- console -memory cpu -->

## Division

`EDX` is part of the dividend. For a positive `EAX` set `EDX` to 0; for a negative `EAX` set it to -1.

```shell
section .text
    MOV EAX, 17
    MOV EDX, 0
    MOV EBX, 5
    IDIV EBX         ; EAX = 3 (quotient), EDX = 2 (remainder)
    INT 1
```
<!-- console -memory cpu -->

```shell
section .text
    MOV EAX, -17
    MOV EDX, -1      ; sign extension of EAX
    MOV EBX, 5
    IDIV EBX         ; EAX = -3, EDX = -2
```
<!-- -console -memory cpu -->

<!-- warning -->
> Dividing by zero stops the program with a **Division by zero** error.

<!-- notice -->
> `MUL` and `DIV` (unsigned) are recognized by the assembler but are not implemented yet. Use `IMUL` and `IDIV`.

**Try it:** set `EBX` to 0 and run the division.

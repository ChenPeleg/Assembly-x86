# Loops

## LOOP

`LOOP label` decrements `ECX`, then jumps if `ECX` is not 0. Set `ECX` first.

```shell
section .text
    MOV EAX, 0
    MOV ECX, 5
again:
    ADD EAX, ECX
    LOOP again       ; EAX = 5+4+3+2+1 = 15
    INT 1
```
<!-- console -memory cpu -->

<!-- warning -->
> If `ECX` is 0 when the loop starts, it wraps around and runs about 4 billion times. Check it with `CMP` first.

## Skipping an empty loop

```shell
section .text
    MOV ECX, 0
    MOV EAX, 0
    CMP ECX, 0
    JE skip
again:
    INC EAX
    LOOP again
skip:
    INT 1            ; prints 0
```
<!-- console -memory cpu -->

## Loops with CMP

For other conditions build the loop yourself.

```shell
section .text
    MOV EAX, 1
again:
    ADD EAX, EAX     ; double it
    CMP EAX, 100
    JL again         ; until EAX >= 100
    INT 1            ; prints 128
```
<!-- console -memory cpu -->

<!-- notice -->
> `JCXZ` and `JECXZ` exist in the instruction list, but the assembler currently does not accept them.

**Try it:** count down from 10 to 1 and print each number.

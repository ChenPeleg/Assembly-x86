# CPU flags

Flags are single bits that record what happened in the last arithmetic or logic instruction. Jumps like `JE` or `JL`
read them to make decisions. Watch them in the CPU panel while you step through each snippet.

| Flag | Name     | Set when                                                  |
|------|----------|-----------------------------------------------------------|
| ZF   | Zero     | the result is 0                                           |
| SF   | Sign     | the top bit of the result is 1 (negative as signed)       |
| CF   | Carry    | an unsigned result does not fit (carry out / borrow)      |
| OF   | Overflow | a signed result does not fit                              |
| PF   | Parity   | the lowest byte of the result has an even number of 1 bits |
| DF   | Direction| set manually with `STD`, cleared with `CLD`               |

## Zero flag (ZF)

```shell
section .text
    MOV EAX, 5
    CMP EAX, 3     ; 5 - 3 = 2, ZF = 0
    CMP EAX, 5     ; 5 - 5 = 0, ZF = 1
    MOV EAX, 1
    DEC EAX        ; reaches 0, ZF = 1
```
<!-- -console -memory cpu -->

`MOV` never changes flags. `CMP` subtracts without storing the result.

## Sign flag (SF)

```shell
section .text
    MOV EAX, 1
    SUB EAX, 2     ; result is -1, SF = 1
    ADD EAX, 5     ; result is 4, SF = 0
```
<!-- -console -memory cpu -->

## Carry flag (CF)

CF signals overflow of **unsigned** numbers.

```shell
section .text
    MOV EAX, 0xFFFFFFFF
    ADD EAX, 1     ; 4294967296 does not fit in 32 bits: EAX = 0, CF = 1, ZF = 1
    MOV EAX, 1
    SUB EAX, 2     ; borrow: CF = 1
    CLC            ; clear carry
    STC            ; set carry
```
<!-- -console -memory cpu -->

`INC` and `DEC` do not change CF.

## Overflow flag (OF)

OF signals overflow of **signed** numbers.

```shell
section .text
    MOV EAX, 0x7FFFFFFF  ; biggest signed number
    ADD EAX, 1           ; wraps to -2147483648: OF = 1, SF = 1, CF = 0
    MOV EAX, 100
    ADD EAX, 20          ; 120 fits: OF = 0
```
<!-- -console -memory cpu -->

The same bits mean different numbers when read as signed or unsigned, so one `ADD` can set CF but not OF, or the other
way around: `0xFFFFFFFF + 1` sets CF but not OF (-1 + 1 = 0).

<!-- info -->
> The emulator computes flags on the whole 32-bit register, so use `EAX`-sized values to watch CF and OF.

## Parity flag (PF)

```shell
section .text
    MOV EAX, 3
    OR EAX, EAX    ; 00000011 has two 1 bits (even): PF = 1
    MOV EAX, 7
    OR EAX, EAX    ; three 1 bits (odd): PF = 0
```
<!-- -console -memory cpu -->

## Using flags

```shell
section .text
    MOV ECX, 3
again:
    DEC ECX
    JNZ again      ; jump while ZF = 0
```
<!-- -console -memory cpu -->

<!-- notice -->
> This emulator has no `AF` (auxiliary carry) flag, `TEST` or `CMC`; use `CMP`, `AND` and `CLC`/`STC` instead.

**Try it:** change `0x7FFFFFFF` to `0x7FFFFFFE` and watch OF stay clear.

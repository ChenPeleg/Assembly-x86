# Add and subtract

| Instruction     | Meaning                              |
|-----------------|--------------------------------------|
| `ADD dst, src`  | `dst = dst + src`                    |
| `SUB dst, src`  | `dst = dst - src`                    |
| `INC dst`       | `dst = dst + 1` (CF unchanged)       |
| `DEC dst`       | `dst = dst - 1` (CF unchanged)       |
| `ADC dst, src`  | `dst = dst + src + CF`               |
| `SBB dst, src`  | `dst = dst - src - CF`               |

```shell
section .text
    MOV EAX, 10
    ADD EAX, 5       ; 15
    SUB EAX, 3       ; 12
    INC EAX          ; 13
    DEC EAX          ; 12
    INT 1
```
<!-- console -memory cpu -->

All of them update ZF, SF, CF, OF and PF (except `INC`/`DEC` leave CF alone).

## Adding big numbers: ADC and SBB

A 32-bit register can't hold a 64-bit number, but two can. Add the low parts first, then add the high parts **plus the
carry**.

```shell
section .text
    ; 0x00000001_FFFFFFFF + 0x00000000_00000001
    MOV EAX, 0xFFFFFFFF   ; low part
    MOV EDX, 1            ; high part
    ADD EAX, 1            ; EAX = 0, CF = 1
    ADC EDX, 0            ; EDX = 2: the carry moved up
```
<!-- -console -memory cpu -->

`SBB` does the same for subtraction, using the borrow.

**Try it:** replace `ADC EDX, 0` with `ADD EDX, 0` and see the carry get lost.

# Compare and jump

`CMP a, b` computes `a - b`, throws the result away and keeps only the flags.
A conditional jump then reads those flags.

```shell
section .text
    MOV EAX, 5
    CMP EAX, 5
    JE equal         ; jump if ZF = 1
    MOV EBX, 1
    HLT
equal:
    MOV EBX, 2
```
<!-- -console -memory cpu -->

`JMP label` always jumps.

## Conditional jumps

Pick the signed or the unsigned family according to how you treat the numbers.

| Meaning             | Unsigned        | Signed          |
|---------------------|-----------------|-----------------|
| equal               | `JE` / `JZ`     | `JE` / `JZ`     |
| not equal           | `JNE` / `JNZ`   | `JNE` / `JNZ`   |
| below / less        | `JB` / `JC`     | `JL`            |
| above or equal / greater or equal | `JAE` / `JNC` | `JGE` |
| below or equal / less or equal | `JNA` | `JNG` |
| above / greater     | `JA`            | `JG`            |

Flag based: `JS` / `JNS` (sign), `JO` / `JNO` (overflow), `JP` and `JNP` (parity).

<!-- notice -->
> `JBE`, `JLE`, `JPE`, `JPO`, `JNBE` and `JNLE` are not accepted by the assembler yet; use their equivalents `JNA`, `JNG`, `JP`, `JNP`, `JA` and `JG`.

```shell
section .text
    MOV EAX, -1
    CMP EAX, 1
    JL less           ; taken: -1 < 1 as signed numbers
    MOV EBX, 1
    HLT
less:
    MOV EBX, 2
```
<!-- -console -memory cpu -->

`JL`/`JG` treat the numbers as signed (they read SF and OF). `JB`/`JA` treat them as unsigned (they read CF).
Choose the family that matches your data.

## If / else

```shell
section .text
    MOV EAX, 7
    CMP EAX, 10
    JGE big
    MOV EBX, 0        ; EAX < 10
    JMP done
big:
    MOV EBX, 1        ; EAX >= 10
done:
```
<!-- -console -memory cpu -->

**Try it:** change 7 to 12 and check `EBX`.

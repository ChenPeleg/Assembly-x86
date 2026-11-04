# The stack

The stack is a region at the top of memory used for temporary values. `ESP` points to its top. It grows **downward**.

- `PUSH x`: `ESP = ESP - 4`, then store `x` at `[ESP]`.
- `POP r`: load `[ESP]` into `r`, then `ESP = ESP + 4`.

```shell
section .text
    PUSH 10
    PUSH 20
    PUSH 30
    POP EAX      ; 30
    POP EBX      ; 20
    POP ECX      ; 10
```
<!-- -console memory cpu word:4 -->

Watch `ESP` go down by 4 on each push and up on each pop.

## Saving registers

```shell
section .text
    MOV EAX, 5
    PUSH EAX      ; save
    MOV EAX, 99   ; use EAX for something else
    POP EAX       ; restore: 5
```
<!-- -console memory cpu word:4 -->

<!-- warning -->
> Every `PUSH` needs a matching `POP`. An unbalanced stack breaks `RET`.

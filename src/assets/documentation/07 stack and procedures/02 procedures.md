# Procedures

`CALL label` pushes the address of the next instruction and jumps. `RET` pops that address back into `EIP`.

```shell
section .text
    MOV EAX, 1
    CALL double
    CALL double
    INT 1          ; prints 4
    HLT

double:
    ADD EAX, EAX
    RET
```
<!-- console memory cpu word:4 -->

Always end the main code with `HLT`, or execution would fall into the procedure.

## Arguments and ENTER / LEAVE

Pass arguments by pushing them. `ENTER` saves `EBP` and makes it point to the new frame; `LEAVE` undoes it.
After `ENTER` the argument is at `[EBP + 8]`.

```shell
section .text
    PUSH 7
    CALL square
    ADD ESP, 4      ; remove the argument
    INT 1           ; prints 49
    HLT

square:
    ENTER
    MOV EAX, [EBP + 8]
    MOV EBX, EAX
    IMUL EBX        ; EAX = EAX * EBX
    LEAVE
    RET
```
<!-- console memory cpu word:4 -->

With several arguments, the last pushed is at `[EBP + 8]`, the one before at `[EBP + 12]`, and so on.

## Recursion

The factorial example in *Hello world advanced* calls itself with a smaller argument. Step through it and watch the
stack grow with every call and shrink while returning.

**Try it:** write a procedure that adds two arguments `[EBP + 8]` and `[EBP + 12]`.

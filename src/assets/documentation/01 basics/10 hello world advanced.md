# Hello world advanced

This program prints a string and then the factorial of 5. Step through it and watch the stack in the memory panel.

```shell
section .data
hello:
    db 'Hello world!', 10, 0
section .text
    MOV EAX, hello
    INT 2   ; print string EAX

    PUSH 5
    CALL factorial
    INT 1   ; print EAX
    HLT

factorial:
    ENTER

    CMP [EBP + 8], 1
    JNE .recurse
    MOV EAX, 1
    JMP .end

.recurse:
    MOV EAX, [EBP + 8]
    DEC EAX

    PUSH EAX
    CALL factorial

    IMUL [EBP + 8]

.end:
    LEAVE
    RET
```
<!-- console memory cpu -->

## How it works

1. **Data**: `hello` labels the bytes `Hello world!`, a newline (`10`) and a terminating `0`.
2. **Print**: `MOV EAX, hello` puts the string address in `EAX`; `INT 2` prints until the `0`.
3. **Call**: `PUSH 5` passes the argument on the stack, `CALL` pushes the return address and jumps.
4. **Frame**: `ENTER` sets up `EBP`, so the argument is at `[EBP + 8]`. `LEAVE` and `RET` undo it.
5. **Recursion**: if the argument is not 1, the procedure calls itself with `n - 1`, then multiplies the result by `n`.
6. **Result**: `EAX` holds `120`, printed by `INT 1`.

`.recurse` and `.end` are local labels: they belong to the nearest label above (`factorial`).
The stack and procedures are explained in detail in the *Stack & procedures* chapter.

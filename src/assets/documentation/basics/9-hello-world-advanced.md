# Hello world

Simple hello world


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




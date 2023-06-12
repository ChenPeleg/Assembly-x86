# Hello world

Simple hello world


```shell
section .data
hello:
    db 'Hello world!'
section .text
    MOV EAX, hello
    INT 2   ; print string EAX

```




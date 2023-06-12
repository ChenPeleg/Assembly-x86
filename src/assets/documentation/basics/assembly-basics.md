# Inspirations



```shell
section.text

global _start
_start:


```
<!-- console;cpu;binary; -->


Simple hello world


```shell
section .data
hello:
    db 'Hello world!', 10, 0
section .text
    MOV EAX, hello
    INT 2   ; print string EAX

```



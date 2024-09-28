# Basic syntax - structure of an assembly program



<!-- new -->
> In this site and tutorial we'll use the NASM assembler, which is a popular assembler for the x86 architecture. NASM uses a syntax that is similar to Intel's assembly language syntax. The syntax is designed to be simple and readable, making it easier for programmers to write and understand assembly code.

## Sections

In NASM, an assembly program is divided into sections, each of which serves a specific purpose. The two main sections are:

- **.data**: This section is used to declare data that will be used by the program. This includes variables, constants, and strings.
- **.text**: This section contains the actual code of the program. It includes the instructions that the CPU will execute.

There is another section that is sometimes used: .bss. This section is used to declare uninitialized data that will be used by the program (this tutorial and emulator does not support this tag).


```shell
section .data
hello:
    db 'Stored data' ; the string 'Data from the Data section!' is stored in memory
section .text  ; the actual code of the program starts here:
    MOV EAX, hello
    INT 2

```
<!-- console -memory -cpu -->

## Comments


Comments are used to document the code and explain what it does. Comments are ignored by the assembler and do not affect the execution of the program. Comments in NASM start with a semicolon `;` and continue until the end of the line.

```shell
section .text ;  This is a comment
MOV EAX, 1 ; This is another comment
```
<!-- console -memory -cpu -->

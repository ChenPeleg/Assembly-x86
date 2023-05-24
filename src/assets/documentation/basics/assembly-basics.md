# Inspirations

```shell
section.text
global _start
_start:

```
## Best:

* [https://kobzol.github.io/davis/](https://kobzol.github.io/davis/)
* [https://github.com/Kobzol/davis](https://github.com/Kobzol/davis)
* [https://exuanbo.xyz/assembler-simulato](https://exuanbo.xyz/assembler-simulato)
* [https://roerohan.github.io/8086.js/](https://roerohan.github.io/8086.js/)
* http://asmdebugger.com/
* https://schweigi.github.io/assembler-simulator/

## Nice:

- https://github.com/Mati365/ts-c-compiler

An assembly program can be divided into three sections −

The data section,

The bss section, and

The text section.

The data Section
The data section is used for declaring initialized data or constants. This data does not change at runtime. You can
declare various constant values, file names, or buffer size, etc., in this section.

The syntax for declaring data section is −

section.data
The bss Section
The bss section is used for declaring variables. The syntax for declaring bss section is −

section.bss
The text section
The text section is used for keeping the actual code. This section must begin with the declaration global _start, which
tells the kernel where the program execution begins.

The syntax for declaring text section is −
```shell

section.text
global _start
_start:

```

Comments
Assembly language comment begins with a semicolon (;). It may contain any printable character including blank. It can
appear on a line by itself, like −

; This program displays a message on screen
or, on the same line along with an instruction, like −

add eax, ebx ; adds ebx to eax

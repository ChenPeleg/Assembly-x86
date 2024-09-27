# Hello world

Let's start with a simple hello world example:


```shell
section .data
hello:
    db 'Hello world!'
section .text
;------------------------------------------
    MOV EAX, hello
    INT 2   ; print string EAX

```
<!-- console -memory -cpu -->


<!-- new -->
> you can press the `Try it` button to see this example live in the emulator

## What is Assembly language?

Assembly language is a low-level programming language that is a step closer to the actual hardware of a computer. It's like a bridge between the high-level languages that humans use to write programs and the machine language that computers understand.
In assembly language, instructions are written using simple and short commands that directly correspond to the operations performed by the computer's processor. These commands are called "mnemonics." Each mnemonic represents a specific operation, such as adding numbers or moving data from one place to another.
Unlike high-level languages that use words and
phrases that are easier for humans to understand,
assembly language instructions are more basic and
closely resemble the actual machine instructions that
the computer's processor can execute. This makes assembly
language programs more efficient and gives programmers fine-grained control over the hardware.

<br>

In this tutorial we'll try to explain the basics of the language and to show how the cpu actually works.

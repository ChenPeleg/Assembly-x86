# Registers cheat sheet

EAX It is an "accumulator", which is the default register for many addition and multiplication instructions.

EBX It is a "base address" (base) register, which stores the base address during memory addressing.

ECX It is a counter, which is the default counter of the repeat (REP) prefix instruction and LOOP instruction.

EDX It is always used to put the remainder produced by integer division.

ESI/EDIb They are called "source/destination index", because in many string manipulation instructions, DS:ESI points to
the source string, and ES:EDI points to the target string.

EBP It is a "BASE POINTER", which is most often used as a "frame pointer" for high-level language function calls. When
cracking, you can often see a standard function start code:push ebp ;Save current ebp mov ebp,esp ;EBP is set to the
current stack pointer sub esp, xxx ;Reserve xxx bytes for function temporary variables. ...

Suffixes: b=byte (8 bits); w=word (16 bits); l=long (32 bits).

Registers

64-bit

There are sixteen 64-bit registers in x86-64:
%rax, %rbx, %rcx, %rdx, %rdi, %rsi, %rbp, %rsp, and %r8-r15.
Of these, %rax, %rcx, %rdx, %rdi, %rsi, %rsp, and %r8-r11 are considered caller-save registers, meaning that they are
not necessarily saved across function calls.

By convention, %rax is used to store a function’s return value, if it exists and is no more than 64 bits long. (Larger
return types like structs are returned using the stack.) Registers %rbx, %rbp, and %r12-r15 are callee-save registers,
meaning that they are saved across function calls. Register %rsp is used as the stack pointer, a pointer to the topmost
element in the stack.



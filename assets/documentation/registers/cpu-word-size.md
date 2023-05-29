Differnece in 16, 32, 64 bit cpu

8086 16 bits
80286 16 bits
80386 32 bits
80486 32 bits
Pentium 32 bits

EAX is the full 32-bit value
AX is the lower 16-bits
AL is the lower 8 bits
AH is the bits 8 through 15 (zero-based

RAX, which hold a 64-bit value, and where EAX is mapped to the lower 32 bits.

EAX AX AL
------------
al and ah are always BYTE-sized (8), ax is always WORD-sized (16), eax is always DWORD-sized (32), and rax is always
QWORD-sized(64). But it doesn't hurt to include it anyway, if you like, for consistency with the way you notate memory
operands
_-------------_

All of this also applies to EBX/RBX, ECX/RCX, and EDX/RDX. The other registers like EDI/RDI have a DI low 16-bit partial
register, but no high-8 part, and the low-8 DIL is only accessible in 64-bit mode: Assembly registers in 64-bit
architecture

Writing AL, AH, or AX leaves other bytes unmodified in the full AX/EAX/RAX, for historical reasons.

i.e. it has to merge a new AL into the full RAX, for example. (In 32 or 64-bit code, prefer a movzx eax, byte [mem] or
movzx eax, word [mem] load if you don't specifically want this merging: Why doesn't GCC use partial registers?)

Writing EAX zero-extends into RAX. (Why do x86-64 instructions on 32-bit registers zero the upper part of the full
64-bit register?)

Again, all of this applies to every register, not just RAX. e.g. writing DI or DIL merges into the old RDI, writing EDI
zero-extends and overwrites the full RDI. Same for R10B or R10W writes merging, writing R10D leaving R10 independent of
the old R10 value.

Share Improve this answer

EAX It is an "accumulator", which is the default register for many addition and multiplication instructions.

EBX It is a "base address" (base) register, which stores the base address during memory addressing.

ECX It is a counter, which is the default counter of the repeat (REP) prefix instruction and LOOP instruction.

EDX It is always used to put the remainder produced by integer division.

ESI source index
EDI destination inde - They are called "source/destination index",
because in many string manipulation instructions, DS:ESI points to the source string, and ES:EDI points to the target
string.

EBP It is a "BASE POINTER", which is most often used as a "frame pointer" for high-level language function calls. When
cracking, you can often see a standard function start code:



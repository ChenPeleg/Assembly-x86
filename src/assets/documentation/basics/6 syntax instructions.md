
# Basic Assembly Syntax

In assembly language, each statement typically follows a specific structure. The general format of an assembly language statement is:   <br><br>

`[label]   mnemonic   [operands]   [;comment]`
<br><br>
- **label**: An optional field that marks a location in the code. It is used as a reference point for jumps and loops.
- **mnemonic**: The operation code that specifies the instruction to be executed.
- **operands**: The data or memory locations involved in the operation. This field is optional and depends on the mnemonic.
- **comment**: An optional field that provides explanations or notes about the code. Comments start with a semicolon `;` and continue until the end of the line.

## Examples

### Example 1: Simple MOV Instruction

```shell

section .text
start:  MOV EAX, 1  ; Move the value 1 into the EAX register

```

- **label**: `start`
- **mnemonic**: `MOV`
- **operands**: `EAX, 1`

### Example 2: ADD Instruction with Comment

```shell

section .text
   ADD EAX, EBX  ; Add the value in EBX to EAX
```

- **label**: (none)
- **mnemonic**: `ADD`
- **operands**: `EAX, EBX`

### Example 3: JMP Instruction with Label

```shell

section .text
   loop:
   mov EAX, 1
   JMP loop     ; Jump to the label 'loop'

```

- **label**: `loop`
- **mnemonic**: `JMP`
- **operands**: `loop`

### Example 4: Data Declaration

```shell

.section .data
    DB 'Hello, World!'  ; Declare a string

```

- **label**: `data`
- **mnemonic**: `DB`
- **operands**: `'Hello, World!'`
### Example 5: Conditional Jump

```shell

section .text

        CMP EAX, 0    ; Compare EAX with 0
        JE end        ; Jump to 'end' if EAX is zero
end:    NOP           ; No operation

```

- **label**: `end`
- **mnemonic**: `NOP`
- **operands**: (none)

In this example:
- The `CMP` instruction compares the value in `EAX` with 0.
- The `JE` instruction jumps to the label `end` if the comparison is true (i.e., `EAX` is zero).
- The `NOP` instruction does nothing and is often used as a placeholder.

These examples illustrate the basic structure and components of assembly language statements. By following this format, you can write clear and understandable assembly code.

## Example 5: system interrupt

```shell

section .text
    MOV EAX, 1
    INT 1

```
<!-- notice -->
> In this tutorial and emulator, we'll use the **INT** instruction to call system interrupts. The **INT** instruction generates a software interrupt, which transfers control to the operating system's interrupt handler. The interrupt number is specified as an operand to the **INT** instruction. Different interrupt numbers correspond to different system services or functions. In this example, we use interrupt number 1 to print a number, and 2 to print a string stored in the **EAX** register.


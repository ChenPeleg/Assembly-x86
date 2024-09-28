# Basic Assembly Syntax

In assembly language, each statement typically follows a specific structure. The general format of an assembly language
statement is:

`[label]   mnemonic   [operands]   [;comment]`

- **label**: An optional field that marks a location in the code. It is used as a reference point for jumps and loops.
- **mnemonic**: The operation code that specifies the instruction to be executed.
- **operands**: The data or memory locations involved in the operation. This field is optional and depends on the
  mnemonic.
- **comment**: An optional field that provides explanations or notes about the code. Comments start with a semicolon `;`
  and continue until the end of the line.

## Examples

Let's look at some examples of assembly language statements to illustrate the syntax and structure.

<!-- info -->
> Note: some of these examples may not be clear to you yet, but they will be explained in detail in later sections.

### Example 1: Simple MOV Instruction

```shell

section .text

start:  MOV EAX, 1  ; Move the value 1 into the EAX register

```

<!-- -console -memory cpu -->

- **label**: `start`
- **mnemonic**: `MOV`
- **operands**: `EAX, 1`

### Example 2: ADD Instruction with Comment

```shell

section .text

   ADD EAX, EBX  ; Add the value in EBX to EAX

```

<!-- -console -memory cpu -->

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

<!-- -console -memory cpu -->

Notice that the `JMP` has a label as an operand. This label is used to specify the location to jump to.

- **label**: `loop`
- **mnemonic**: `JMP`
- **operands**: `loop`

### Example 4: Data Declaration

```shell

section .data

    DB 'Hello, World!'  ; Declare a string

```

<!-- -console memory -cpu word:1 ascii -->

- **label**: `data`
- **mnemonic**: `DB`
- **operands**: `'Hello, World!'`

## Example 4: system interrupt

```shell

section .text
    MOV EAX, 1
    INT 1

```

<!-- -console memory -cpu word:1 ascii -->
The `INT` instruction is used to generate a software interrupt. In this example, we use interrupt number 1 to print a
number stored in the `EAX` register.



<!-- notice -->
> In this tutorial and emulator, we'll use the **INT** instruction to call system interrupts. The **INT** instruction
> generates a software interrupt, which transfers control to the operating system's interrupt handler. The interrupt
> number is specified as an operand to the **INT** instruction. Different interrupt numbers correspond to different system
> services or functions. In this example, we use interrupt number 1 to print a number, and 2 to print a string stored in
> the **EAX** register.


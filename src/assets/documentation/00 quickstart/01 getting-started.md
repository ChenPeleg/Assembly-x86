# Quick Start Guide

## Welcome!

Welcome to the x86 Assembly Emulator! This guide will help you understand the emulator and run your first program.

This is a browser-based x86 assembly emulator and debugger that allows you to write, run, and debug assembly code with visual feedback. You can see the CPU state, memory contents, and console output in real-time as your program executes.

## Understanding the Interface

The emulator interface consists of several key components:

![Emulator Interface](assets/img/quick-start-interface.png)

### Code Editor (Left Side)
This is where you write your assembly code. The editor supports:
- **Line numbers** for easy reference
- **Syntax highlighting** for better readability
- **Breakpoints** (click the ">" next to line numbers)
- **Current execution line** highlighting during debugging

### Console Output (Right Side, Top)
Displays text output from your program when you use the `INT 2` instruction to print strings or `INT 1` to print numbers.

### CPU Visualization (Right Side, Middle)
Shows the current state of all CPU registers and status flags including:
- **General-purpose registers**: EAX, EBX, ECX, EDX, and others
- **Special registers**: EIP (Instruction Pointer), EBP (Base Pointer), ESP (Stack Pointer)
- **Status flags**: Zero Flag (ZF), Sign Flag (SF), Overflow Flag (OF), and more
- **Tick rate slider**: Control execution speed

### Memory View (Right Side, Bottom)
Displays the contents of memory in different formats:
- **Byte size**: View as 1, 2, or 4 bytes
- **Format**: Display as Decimal, Hex, ASCII, or Binary

### Control Buttons (Top)
- **Play** (▶): Start or resume execution
- **Stop** (■): Stop execution and reset
- **Pause** (⏸): Pause execution
- **Continue** (▶|): Resume from pause
- **Step** (⏭): Execute one instruction at a time
- **Assemble**: Compile your code before running

## Your First Program: Hello World

Let's start with a simple "Hello World" program. This example demonstrates basic assembly syntax and how to display text.

```nasm
section .data
hello:
    db 'Hello world!'
section .text
    MOV EAX, hello
    INT 2   ; print string EAX
```
<!-- console -memory -cpu --> 

> Press the `Try it` button above to load this example into the emulator!

### Understanding the Code

1. **`section .data`**: Defines the data section where we store constants and variables
2. **`hello:`**: A label marking the location of our string
3. **`db 'Hello world!'`**: Declares a byte string "Hello world!"
4. **`section .text`**: Defines the code section where instructions go
5. **`MOV EAX, hello`**: Moves the address of the hello string into register EAX
6. **`INT 2`**: Software interrupt that prints the string at address EAX to the console

## Running Your Program: Step by Step

Follow these steps to run your first program:

### Step 1: Load or Write Code
Either click "Try it" on the example above, or type the code into the editor manually.

### Step 2: Assemble the Code
Click the **Assemble** button to compile your assembly code. If there are any syntax errors, they will be displayed.

### Step 3: Run the Program
Click the **Play** button (▶) to execute your program. The code will run and you'll see:
- "Hello world!" appears in the **Console** panel
- Register values update in the **CPU** panel
- Memory contents populate in the **Memory** panel

### Step 4: Step Through (Optional)
For debugging, you can:
1. Click **Assemble** first
2. Click **Step** (⏭) to execute one instruction at a time
3. Watch how each instruction changes the CPU registers and memory
4. Observe the current line being highlighted in the editor

### Step 5: Set Breakpoints (Optional)
Click on the ">" symbols next to line numbers to set breakpoints. When you run the program, it will pause at these points, allowing you to inspect the state.

## Understanding Register Values

As your program runs, you'll see values changing in the CPU panel:

- **EIP** (Instruction Pointer): Shows which instruction is currently being executed
- **EAX** (Accumulator): General-purpose register, often used for return values and arithmetic
- **EBP** (Base Pointer): Points to the base of the current stack frame
- **ESP** (Stack Pointer): Points to the top of the stack (starts at 256)

After running the "Hello World" example, you'll typically see:
- EIP will advance as each instruction executes
- EAX will contain the memory address of the "hello" string
- Other registers remain at their initial values

The **Flags** section shows status information:
- **ZF**: Set to 1 when the result of an operation is zero
- **SF**: Set to 1 when the result is negative
- **CF**: Set to 1 when there's a carry out from the most significant bit

## What to Do Next

Now that you've run your first program, you're ready to learn more! Here are the recommended next steps:

### Continue with the Tutorial
Start with the basics tutorial to learn assembly fundamentals:
- [Assembly Guide Welcome](#/docs/01%20basics%2B01%20assembly%20guide%20welcome)

### Explore More Examples
- [Hello World Advanced](#/docs/01%20basics%2B10%20hello%20world%20advanced) - More complex hello world examples
- [Registers](#/docs/01%20basics%2B08%20registers) - Learn about CPU registers in detail
- [Memory](#/docs/01%20basics%2B09%20memory) - Understand how memory works

### Experiment!
Try modifying the hello world program:
- Change the message text
- Add more `db` statements with different strings
- Try printing numbers with `INT 1`

Happy coding, and enjoy learning x86 assembly!

# Interface Guide

Welcome to the Assembly x86 Emulator! This guide will help you understand all the features of the interface.

## Main Interface Components

The emulator interface consists of several key panels that work together to help you write, run, and debug assembly code:

### 1. Code Editor (Left Panel)

The code editor is where you write your assembly programs. It features:

- **Syntax Highlighting**: Intel/NASM syntax with color-coded keywords
- **Line Numbers**: Each line is numbered for easy reference
- **Breakpoints**: Click on a line number to set/remove a breakpoint (red dot)
- **Current Execution Line**: The line being executed is highlighted in yellow

**Example:**
```shell
section .data
message:
    db 'Hello!'
section .text
    MOV EAX, message
    INT 2   ; print string
```
<!-- console cpu memory --> 

### 2. CPU Panel

The CPU panel shows the current state of the processor:

**Registers:**
- **General Purpose**: AX, BX, CX, DX (and their 16-bit/8-bit variations)
- **Index Registers**: SI, DI
- **Pointer Registers**: SP, BP
- **Segment Registers**: CS, DS, SS, ES

**Status Flags:**
- **CF** (Carry Flag): Set when arithmetic operation produces a carry
- **ZF** (Zero Flag): Set when result is zero
- **SF** (Sign Flag): Set when result is negative
- **OF** (Overflow Flag): Set when signed arithmetic overflows

### 3. Memory Panel

The memory panel visualizes the program's memory:

**View Options:**
- **Byte Size**: Choose 1, 2, or 4 bytes per value
- **Display Format**: 
  - Number (decimal)
  - Hexadecimal
  - Binary
  - ASCII (shows text representation)

**Memory Sections:**
- **.data**: Static data defined in your program
- **.text**: Your code instructions
- **Stack**: Dynamically allocated memory (grows downward)

### 4. Console/Output Panel

The console displays program output:
- Results from `INT 2` (print string)
- Results from `INT 3` (print number)
- Helpful for debugging and seeing program results

## Execution Controls

Located at the top of the editor, these buttons control program execution:

- **Run** ▶️: Start program execution from the beginning
- **Pause** ⏸️: Pause execution (useful with slow tick rates)
- **Step** ⏭️: Execute one instruction at a time
- **Stop** ⏹️: Stop execution and reset
- **Continue**: Resume execution from current position

**Tick Rate Slider**: Control execution speed (slower = easier to follow)

## Using Breakpoints

Breakpoints let you pause execution at specific lines:

1. **Set Breakpoint**: Click the line number where you want to pause
2. **Run to Breakpoint**: Click Run - execution will stop at the breakpoint
3. **Inspect State**: Check registers and memory at that point
4. **Continue**: Click Continue or Step to proceed

**Example Use Case:**
```shell
section .text
    MOV AX, 5      ; Set breakpoint here
    MOV BX, 10
    ADD AX, BX     ; Set breakpoint here to inspect after addition
    INT 3          ; print number in AX
```
<!-- console cpu --> 

## Step-by-Step Debugging

The Step feature is perfect for understanding how each instruction affects the CPU:

1. Click **Step** to execute one instruction
2. Watch the **CPU panel** update with new register values
3. Observe the **Memory panel** for memory changes
4. See the **highlighted line** move to the next instruction

## Tips for Using the Interface

- **Start Simple**: Begin with basic programs and gradually add complexity
- **Use Breakpoints**: They're essential for debugging larger programs
- **Watch Registers**: Monitor how values change with each instruction
- **Memory View**: Switch between ASCII and number views to understand data
- **Tick Rate**: Slow it down when learning, speed up for familiar code

## Try It Yourself!

Here's a simple program to practice with:

```shell
section .data
value1:
    db 25
value2:
    db 15
section .text
    MOV AL, [value1]   ; Load first value
    MOV BL, [value2]   ; Load second value
    ADD AL, BL         ; Add them together
    MOV AH, 0          ; Clear high byte
    INT 3              ; Print result (should be 40)
```
<!-- console cpu memory --> 

**Exercise:**
1. Set a breakpoint on the `ADD AL, BL` line
2. Run the program until it hits the breakpoint
3. Check the values in AL and BL registers
4. Step through the ADD instruction
5. Observe the result in AL

## Next Steps

Now that you understand the interface, you're ready to:
- Learn assembly syntax and instructions
- Write your own programs
- Debug complex code
- Explore advanced features

Happy coding! 🚀

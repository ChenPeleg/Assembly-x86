# Debugging Guide

Debugging is essential for understanding and fixing assembly programs. This guide teaches you how to use the emulator's debugging features effectively.

## The Power of Breakpoints

Breakpoints pause execution at specific lines, letting you inspect the program state.

### Setting Breakpoints

1. **Click the line number** where you want to pause
2. A **red dot** appears indicating the breakpoint
3. Click again to remove it

### Using Breakpoints

```shell
section .data
value: db 10

section .text
    MOV AL, [value]    ; Set breakpoint here (line 5)
    ADD AL, 5
    MUL AL             ; Set breakpoint here (line 7)
    INT 3
```
<!-- console cpu memory --> 

**Debugging workflow:**
1. Set breakpoints on lines 5 and 7
2. Click **Run** - execution pauses at line 5
3. Check CPU panel: AL should be 10
4. Click **Continue** - execution pauses at line 7
5. Check CPU panel: AL should be 15, AX should be 225 (15*15)

## Step-by-Step Execution

The Step button executes one instruction at a time - perfect for learning!

### When to Use Step

- Understanding how each instruction works
- Tracking register changes line by line
- Finding where things go wrong
- Learning new instructions

### Step Example

```shell
section .text
    MOV AX, 0          ; Start here
    MOV CX, 5
    ADD AX, CX
    ADD AX, CX
    ADD AX, CX         
    INT 3              ; AX should be 15
```
<!-- console cpu --> 

**Try this:**
1. Click **Step** repeatedly
2. Watch AX increase by 5 each time
3. Count how many times you step (should be 6 times)

## Reading the CPU Panel

The CPU panel shows everything happening in the processor.

### Register Values

Each register displays its current value:
- **Hexadecimal** (e.g., 0x0A)
- **Decimal** in parentheses (e.g., (10))

### Status Flags

Flags change based on instruction results:

```shell
section .text
    MOV AL, 5
    SUB AL, 5          ; Sets ZF (Zero Flag)
    SUB AL, 1          ; Sets SF (Sign Flag) - result is negative
```
<!-- console cpu --> 

**After `SUB AL, 5`:**
- ZF = 1 (result is zero)
- AL = 0

**After `SUB AL, 1`:**
- SF = 1 (result is negative)
- AL = 255 (underflow in unsigned)

## Memory Debugging

The memory panel helps visualize data and stack.

### Viewing Memory

**Change display format:**
- **Number**: See decimal values
- **Hex**: See hexadecimal (common in low-level programming)
- **ASCII**: See text representation
- **Binary**: See individual bits

### Memory Example

```shell
section .data
numbers:
    db 65, 66, 67, 68, 69    ; ASCII codes for 'ABCDE'

section .text
    MOV AL, [numbers]
    INT 3
```
<!-- console cpu memory ascii --> 

**Debugging steps:**
1. Run the program
2. Check Memory panel in ASCII mode
3. You'll see 'ABCDE' in memory
4. AL contains 65 (first byte)

## Common Debugging Scenarios

### Scenario 1: Wrong Output

**Problem:** Program prints wrong number

```shell
section .data
a: db 10
b: db 20

section .text
    MOV AL, [a]
    MOV BL, [b]
    ADD AL, AL         ; Bug! Should be ADD AL, BL
    MOV AH, 0
    INT 3              ; Prints 20, expected 30
```
<!-- console cpu memory --> 

**Debug strategy:**
1. Set breakpoint before ADD
2. Check AL = 10, BL = 20
3. Step through ADD
4. See AL = 20 (10+10, not 10+20!)
5. Fix: Change to `ADD AL, BL`

### Scenario 2: Unexpected Register Values

**Problem:** Register has wrong value

```shell
section .text
    MOV AX, 100
    MOV BL, 3
    DIV BL             ; AX / BL
    INT 3              ; Should print 33
```
<!-- console cpu --> 

**Debug strategy:**
1. Set breakpoint after DIV
2. Check registers: AL = 33 (quotient), AH = 1 (remainder)
3. Understand: DIV stores quotient in AL, remainder in AH
4. If you want AX = 33, add: `MOV AH, 0`

### Scenario 3: Memory Access Issues

**Problem:** Reading wrong memory location

```shell
section .data
array:
    db 1, 2, 3, 4, 5

section .text
    MOV AL, [array]
    ADD AL, [array+1]  ; Should be 1+2=3
    INT 3
```
<!-- console cpu memory --> 

**Debug strategy:**
1. Set breakpoint before each instruction
2. Watch Memory panel
3. See array contents: [1, 2, 3, 4, 5]
4. After first MOV: AL = 1
5. After ADD: AL = 3 ✓

## Advanced Debugging Techniques

### Using Multiple Breakpoints

Set breakpoints at key locations:
- Start of loops
- Before and after function calls
- After complex calculations
- At conditional jumps

### Tick Rate Control

Slow down execution to watch it happen:
1. Move **Tick Rate slider** left (slower)
2. Click **Run**
3. Watch registers update in real-time
4. Great for understanding loops!

### Panel Configuration

Show/hide panels based on what you're debugging:
- Debugging data? Show Memory panel
- Debugging calculations? Show CPU panel
- Checking output? Show Console panel

## Debugging Checklist

When your program doesn't work:

- [ ] Set breakpoint at the start
- [ ] Step through each instruction
- [ ] Check register values after each step
- [ ] Verify memory contents match expectations
- [ ] Check status flags (especially ZF, CF, SF)
- [ ] Ensure correct register sizes (AL vs AX vs EAX)
- [ ] Verify square brackets for memory access
- [ ] Check for typos in labels and instructions

## Practice: Debug This Code

Here's a buggy program. Can you find and fix the bugs?

```shell
section .data
x: db 8
y: db 4

section .text
    MOV AL, x          ; Bug 1: Missing brackets
    MOV BL, [y]
    DIV BL
    INT 3              ; Bug 2: Should clear AH first
```
<!-- console cpu memory --> 

**Bugs:**
1. Line 6: Should be `MOV AL, [x]` (needs square brackets)
2. Line 8: Need `MOV AH, 0` before DIV to clear high byte

**Fixed version:**
```shell
section .data
x: db 8
y: db 4

section .text
    MOV AL, [x]
    MOV BL, [y]
    MOV AH, 0
    DIV BL
    INT 3
```
<!-- console cpu memory --> 

## Summary

You've learned:
- ✅ Setting and using breakpoints
- ✅ Step-by-step execution
- ✅ Reading CPU registers and flags
- ✅ Using memory panel for data visualization
- ✅ Common debugging scenarios
- ✅ Systematic debugging approach

**Pro tip:** The best debuggers use breakpoints strategically and step through code methodically. Take your time and observe each change!

Happy debugging! 🐛🔍

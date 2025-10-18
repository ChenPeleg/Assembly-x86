# Control Flow Instructions

Control flow instructions allow your program to make decisions and repeat actions. They're essential for writing useful programs!

## Unconditional Jump (JMP)

JMP always jumps to a label, no questions asked.

### Basic Syntax
```shell
JMP label
```

### Example: Simple Loop
```shell
section .text
    MOV CX, 0
loop_start:
    ADD CX, 1
    CMP CX, 5
    JMP loop_start    ; Jump back (infinite loop!)
```
<!-- console cpu --> 

**Warning:** This creates an infinite loop! We need conditional jumps to exit.

## Conditional Jumps

Conditional jumps check flags and only jump if a condition is true.

### Common Conditional Jumps

| Instruction | Meaning | Checks |
|-------------|---------|--------|
| JE / JZ | Jump if Equal / Zero | ZF = 1 |
| JNE / JNZ | Jump if Not Equal / Not Zero | ZF = 0 |
| JG / JNLE | Jump if Greater | ZF=0 and SF=OF |
| JL / JNGE | Jump if Less | SF ≠ OF |
| JGE / JNL | Jump if Greater or Equal | SF = OF |
| JLE / JNG | Jump if Less or Equal | ZF=1 or SF≠OF |

### Example: Proper Loop
```shell
section .text
    MOV CX, 0
loop_start:
    ADD CX, 1
    CMP CX, 5         ; Compare CX with 5
    JL loop_start     ; Jump if CX < 5
    MOV AX, CX
    INT 3             ; Print result (should be 5)
```
<!-- console cpu --> 

## The CMP Instruction

CMP compares two values by subtracting them (but doesn't store the result).

### Syntax
```shell
CMP destination, source    ; Sets flags based on destination - source
```

### Example: Finding the Larger Number
```shell
section .data
num1: db 15
num2: db 23

section .text
    MOV AL, [num1]
    MOV BL, [num2]
    CMP AL, BL           ; Compare AL with BL
    JG first_larger      ; Jump if AL > BL
    MOV AL, BL           ; num2 is larger, move it to AL
first_larger:
    MOV AH, 0
    INT 3                ; Print the larger number (23)
```
<!-- console cpu memory --> 

## Real-World Example: Sum of Numbers

Calculate sum of numbers from 1 to 10:

```shell
section .text
    MOV AX, 0            ; Sum starts at 0
    MOV CX, 1            ; Counter starts at 1
sum_loop:
    ADD AX, CX           ; Add current number to sum
    ADD CX, 1            ; Increment counter
    CMP CX, 11           ; Check if we've reached 11
    JL sum_loop          ; If CX < 11, continue loop
    INT 3                ; Print result (should be 55)
```
<!-- console cpu --> 

**How it works:**
- Loop runs while CX < 11 (i.e., for CX = 1,2,3...10)
- Each iteration adds CX to AX
- Result: 1+2+3+4+5+6+7+8+9+10 = 55

## Example: Count Down

```shell
section .text
    MOV CX, 10           ; Start at 10
countdown:
    SUB CX, 1            ; Decrease by 1
    CMP CX, 0            ; Check if zero
    JG countdown         ; Continue if CX > 0
    MOV AX, CX
    INT 3                ; Print 0
```
<!-- console cpu --> 

## Example: Maximum of Three Numbers

Find the largest of three numbers:

```shell
section .data
a: db 45
b: db 67
c: db 23

section .text
    MOV AL, [a]          ; AL = first number
    MOV BL, [b]          ; BL = second number
    CMP AL, BL
    JGE check_third      ; If AL >= BL, check third
    MOV AL, BL           ; Otherwise, AL = BL (larger so far)
check_third:
    MOV BL, [c]          ; BL = third number
    CMP AL, BL
    JGE print_result     ; If AL >= BL, we have the max
    MOV AL, BL           ; Otherwise, AL = BL
print_result:
    MOV AH, 0
    INT 3                ; Print result (should be 67)
```
<!-- console cpu memory --> 

## The TEST Instruction

TEST performs bitwise AND but only sets flags (doesn't store result).

### Check if Number is Even or Odd

```shell
section .data
number: db 17

section .text
    MOV AL, [number]
    TEST AL, 1           ; Check least significant bit
    JZ is_even           ; Jump if zero (even)
    ; Number is odd
    MOV AX, 1
    JMP print
is_even:
    MOV AX, 0
print:
    INT 3                ; Print 1 for odd, 0 for even
```
<!-- console cpu memory --> 

## Practice Exercises

### Exercise 1: Count to N
Modify the sum program to count to a variable N instead of 10:

```shell
section .data
n: db 15

section .text
    MOV AX, 0
    MOV CX, 1
    MOV BL, [n]
    MOV BH, 0            ; BX now contains n
sum_loop:
    ADD AX, CX
    ADD CX, 1
    CMP CX, BX
    JLE sum_loop
    INT 3
```
<!-- console cpu memory --> 

### Exercise 2: Absolute Value
Write a program that makes a number positive:

```shell
section .data
num: db -15              ; Note: will be stored as 241 (two's complement)

section .text
    MOV AL, [num]
    TEST AL, 0x80        ; Check sign bit
    JZ positive          ; Already positive
    NEG AL               ; Make positive
positive:
    MOV AH, 0
    INT 3
```
<!-- console cpu memory --> 

### Exercise 3: Multiply by Repeated Addition
Multiply two numbers using a loop:

```shell
section .data
multiplicand: db 7
multiplier: db 6

section .text
    MOV AL, 0            ; Result
    MOV BL, [multiplicand]
    MOV CL, [multiplier]
mult_loop:
    ADD AL, BL           ; Add multiplicand to result
    SUB CL, 1            ; Decrease counter
    JNZ mult_loop        ; Continue if not zero
    MOV AH, 0
    INT 3                ; Should print 42
```
<!-- console cpu memory --> 

## Common Patterns

### Pattern 1: For Loop (Count Up)
```shell
MOV CX, 0                ; i = 0
for_loop:
    ; loop body here
    ADD CX, 1            ; i++
    CMP CX, limit        ; if i < limit
    JL for_loop          ; continue
```

### Pattern 2: While Loop
```shell
while_loop:
    CMP condition, 0     ; Check condition
    JE end_while         ; Exit if false
    ; loop body here
    JMP while_loop       ; Continue
end_while:
```

### Pattern 3: If-Else
```shell
    CMP value1, value2
    JE else_part         ; If equal, go to else
    ; if body
    JMP end_if
else_part:
    ; else body
end_if:
```

## Summary

You've learned:
- ✅ Unconditional jumps (JMP)
- ✅ Conditional jumps (JE, JNE, JG, JL, etc.)
- ✅ CMP instruction for comparisons
- ✅ TEST instruction for bit checking
- ✅ Creating loops and conditionals
- ✅ Common programming patterns

**Next:** Explore procedures (CALL/RET) and the stack!

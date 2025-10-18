# Arithmetic Operations

Master the fundamental arithmetic instructions in x86 assembly.

## Basic Arithmetic Instructions

### ADD - Addition

Adds two operands and stores result in the destination.

**Syntax:** `ADD destination, source`

```shell
section .text
    MOV AL, 10
    MOV BL, 25
    ADD AL, BL           ; AL = AL + BL = 35
    MOV AH, 0
    INT 3                ; Print 35
```
<!-- console cpu --> 

**Flags affected:** CF, OF, SF, ZF, AF, PF

### SUB - Subtraction

Subtracts source from destination.

**Syntax:** `SUB destination, source`

```shell
section .text
    MOV AL, 50
    MOV BL, 18
    SUB AL, BL           ; AL = AL - BL = 32
    MOV AH, 0
    INT 3                ; Print 32
```
<!-- console cpu --> 

### INC and DEC - Increment/Decrement

Increment or decrement by 1 (faster than ADD/SUB).

```shell
section .text
    MOV CX, 10
    INC CX               ; CX = 11
    INC CX               ; CX = 12
    DEC CX               ; CX = 11
    MOV AX, CX
    INT 3                ; Print 11
```
<!-- console cpu --> 

## Multiplication

### MUL - Unsigned Multiplication

Multiplies unsigned values.

**8-bit:** `MUL BL` → AX = AL × BL
**16-bit:** `MUL BX` → DX:AX = AX × BX

```shell
section .text
    MOV AL, 12
    MOV BL, 5
    MUL BL               ; AX = AL × BL = 60
    INT 3                ; Print 60
```
<!-- console cpu --> 

**Example: Larger numbers**
```shell
section .text
    MOV AL, 25
    MOV BL, 10
    MUL BL               ; AX = 250
    INT 3
```
<!-- console cpu --> 

### IMUL - Signed Multiplication

Multiplies signed values (handles negative numbers).

```shell
section .data
num1: db -5
num2: db 4

section .text
    MOV AL, [num1]
    MOV BL, [num2]
    IMUL BL              ; AX = -5 × 4 = -20
    INT 3                ; Will show large positive (two's complement)
```
<!-- console cpu memory --> 

## Division

### DIV - Unsigned Division

Divides unsigned values.

**8-bit:** `DIV BL` → AL = AX ÷ BL (quotient), AH = remainder

```shell
section .text
    MOV AX, 47
    MOV BL, 5
    DIV BL               ; AL = 9 (quotient), AH = 2 (remainder)
    MOV AH, 0            ; Clear to see quotient
    INT 3                ; Print 9
```
<!-- console cpu --> 

**Show remainder:**
```shell
section .text
    MOV AX, 47
    MOV BL, 5
    DIV BL               ; AL = 9, AH = 2
    MOV AL, AH           ; Move remainder to AL
    MOV AH, 0
    INT 3                ; Print 2
```
<!-- console cpu --> 

### IDIV - Signed Division

Divides signed values.

```shell
section .text
    MOV AX, -20
    MOV BL, 3
    IDIV BL              ; AL = -6, AH = -2
    MOV AH, 0
    INT 3
```
<!-- console cpu --> 

## Practical Examples

### Calculate Average

Calculate average of three numbers:

```shell
section .data
a: db 10
b: db 20
c: db 30

section .text
    MOV AL, [a]
    ADD AL, [b]
    ADD AL, [c]          ; AL = 60
    MOV AH, 0            ; AX = 60
    MOV BL, 3
    DIV BL               ; AL = 20 (average)
    MOV AH, 0
    INT 3
```
<!-- console cpu memory --> 

### Percentage Calculator

Calculate 25% of 80:

```shell
section .text
    MOV AL, 80
    MOV BL, 25
    MUL BL               ; AX = 2000
    MOV BX, 100
    DIV BX               ; AX = 20
    INT 3
```
<!-- console cpu --> 

### Temperature Converter (C to F)

Formula: F = (C × 9/5) + 32

```shell
section .data
celsius: db 25

section .text
    MOV AL, [celsius]    ; AL = 25
    MOV BL, 9
    MUL BL               ; AX = 225
    MOV BL, 5
    DIV BL               ; AL = 45
    ADD AL, 32           ; AL = 77°F
    MOV AH, 0
    INT 3
```
<!-- console cpu memory --> 

### Area of Rectangle

```shell
section .data
width: db 12
height: db 8

section .text
    MOV AL, [width]
    MOV BL, [height]
    MUL BL               ; AX = 96
    INT 3
```
<!-- console cpu memory --> 

## NEG - Two's Complement Negation

Negates a value (makes positive negative or vice versa).

```shell
section .text
    MOV AL, 15
    NEG AL               ; AL = -15 (stored as 241)
    NEG AL               ; AL = 15 (back to positive)
    MOV AH, 0
    INT 3
```
<!-- console cpu --> 

## Working with Larger Numbers

### 16-bit Addition

```shell
section .data
num1: dw 1000            ; Define word (16-bit)
num2: dw 2500

section .text
    MOV AX, [num1]
    ADD AX, [num2]       ; AX = 3500
    INT 3
```
<!-- console cpu memory --> 

### Multiplication Overflow

When result exceeds register size:

```shell
section .text
    MOV AX, 300
    MOV BX, 200
    MUL BX               ; DX:AX = 60000
    INT 3                ; Shows only AX part
```
<!-- console cpu --> 

## Common Patterns

### Sum of Array Elements

```shell
section .data
array: db 5, 10, 15, 20, 25

section .text
    MOV AL, 0            ; Sum = 0
    MOV CX, 5            ; Count
    MOV SI, 0            ; Index
sum_loop:
    ADD AL, [array + SI]
    INC SI
    DEC CX
    JNZ sum_loop
    MOV AH, 0
    INT 3                ; Print 75
```
<!-- console cpu memory --> 

### Multiply by Power of 2 (Using Shifts)

```shell
section .text
    MOV AL, 10
    SHL AL, 1            ; Multiply by 2 = 20
    SHL AL, 1            ; Multiply by 2 = 40
    MOV AH, 0
    INT 3
```
<!-- console cpu --> 

### Safe Division (Check for Zero)

```shell
section .data
dividend: db 100
divisor: db 0

section .text
    MOV AL, [divisor]
    CMP AL, 0
    JE div_by_zero       ; Skip if divisor is zero
    MOV AX, [dividend]
    DIV AL
    MOV AH, 0
    INT 3
    JMP end
div_by_zero:
    MOV AX, 0            ; Return 0 for division by zero
    INT 3
end:
```
<!-- console cpu memory --> 

## Practice Exercises

### Exercise 1: Calculate Expression
Calculate: (15 + 5) × 3 - 10

```shell
section .text
    MOV AL, 15
    ADD AL, 5            ; AL = 20
    MOV BL, 3
    MUL BL               ; AX = 60
    SUB AX, 10           ; AX = 50
    INT 3
```
<!-- console cpu --> 

### Exercise 2: Find Remainder
Find remainder when 100 is divided by 7:

```shell
section .text
    MOV AX, 100
    MOV BL, 7
    DIV BL               ; AL = 14, AH = 2
    MOV AL, AH           ; Get remainder
    MOV AH, 0
    INT 3                ; Print 2
```
<!-- console cpu --> 

### Exercise 3: Double and Add
Double a number then add 10:

```shell
section .data
num: db 17

section .text
    MOV AL, [num]
    ADD AL, AL           ; Double (17 × 2 = 34)
    ADD AL, 10           ; Add 10 = 44
    MOV AH, 0
    INT 3
```
<!-- console cpu memory --> 

## Summary

You've learned:
- ✅ Basic arithmetic: ADD, SUB, INC, DEC
- ✅ Multiplication: MUL (unsigned), IMUL (signed)
- ✅ Division: DIV (unsigned), IDIV (signed)
- ✅ Negation with NEG
- ✅ Practical applications and patterns
- ✅ Handling overflow and division by zero
- ✅ Working with different operand sizes

Arithmetic operations are the foundation of assembly programming!

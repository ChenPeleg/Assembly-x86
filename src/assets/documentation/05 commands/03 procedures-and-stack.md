# Procedures and the Stack

Procedures (functions) let you organize code into reusable blocks. The stack is key to making them work!

## The Stack

The stack is a region of memory that grows downward. It's used for:
- Saving return addresses
- Storing local variables
- Preserving register values
- Passing parameters

### Stack Instructions

| Instruction | Description | Effect on SP |
|-------------|-------------|--------------|
| PUSH value | Push value onto stack | SP decreases |
| POP register | Pop value from stack | SP increases |

## PUSH and POP Basics

### PUSH Example
```shell
section .text
    MOV AX, 100
    MOV BX, 200
    PUSH AX              ; Save AX on stack
    PUSH BX              ; Save BX on stack
    MOV AX, 0            ; Modify AX
    MOV BX, 0            ; Modify BX
    POP BX               ; Restore BX (gets 200)
    POP AX               ; Restore AX (gets 100)
    INT 3                ; Print AX (100)
```
<!-- console cpu memory --> 

**Important:** Stack is LIFO (Last In, First Out). The last PUSH is the first POP.

## Simple Procedure with CALL and RET

CALL jumps to a procedure and saves the return address. RET returns to the caller.

### Basic Procedure
```shell
section .text
    MOV AX, 5
    CALL double_value    ; Call procedure
    INT 3                ; Print AX (should be 10)

double_value:
    ADD AX, AX           ; Double the value in AX
    RET                  ; Return to caller
```
<!-- console cpu memory --> 

**How it works:**
1. CALL saves return address on stack
2. CALL jumps to double_value
3. Procedure executes (AX = 10)
4. RET pops return address and jumps back

## Procedure with Multiple Calls

Procedures can be called multiple times:

```shell
section .text
    MOV AX, 3
    CALL square          ; AX = 9
    CALL square          ; AX = 81
    INT 3                ; Print 81

square:
    MUL AX               ; AX = AX * AX
    RET
```
<!-- console cpu memory --> 

## Preserving Registers

Good procedures save and restore registers they modify:

```shell
section .text
    MOV AX, 10
    MOV BX, 20
    CALL add_five_to_ax  ; Adds 5 to AX
    ADD AX, BX           ; AX = 15 + 20 = 35
    INT 3

add_five_to_ax:
    PUSH BX              ; Save BX (we'll use it)
    MOV BX, 5
    ADD AX, BX           ; AX = AX + 5
    POP BX               ; Restore BX
    RET
```
<!-- console cpu memory --> 

**Why preserve registers?**
The caller expects BX to remain unchanged. Always save/restore!

## Passing Parameters via Registers

Simple way to pass values to procedures:

```shell
section .text
    MOV AL, 12           ; First parameter
    MOV BL, 8            ; Second parameter
    CALL add_numbers     ; Result in AL
    MOV AH, 0
    INT 3                ; Print 20

add_numbers:
    ADD AL, BL           ; Add parameters
    RET
```
<!-- console cpu --> 

## Passing Parameters via Stack

More flexible for multiple parameters:

```shell
section .text
    PUSH 15              ; Second parameter
    PUSH 25              ; First parameter
    CALL add_stack       ; Result in AX
    ADD SP, 4            ; Clean up stack (2 words)
    INT 3                ; Print 40

add_stack:
    PUSH BP              ; Save base pointer
    MOV BP, SP           ; Set up stack frame
    MOV AX, [BP+4]       ; Get first parameter
    ADD AX, [BP+6]       ; Add second parameter
    POP BP               ; Restore base pointer
    RET
```
<!-- console cpu memory --> 

**Stack layout during call:**
```
[BP+6] ← Second parameter (15)
[BP+4] ← First parameter (25)
[BP+2] ← Return address
[BP+0] ← Saved BP
```

## Nested Procedure Calls

Procedures can call other procedures:

```shell
section .text
    MOV AX, 3
    CALL compute         ; Result: 3*3 + 5 = 14
    INT 3

compute:
    CALL square          ; Square AX
    ADD AX, 5            ; Add 5
    RET

square:
    MUL AX               ; AX = AX * AX
    RET
```
<!-- console cpu memory --> 

**Each CALL saves a return address:**
1. Main calls compute (saves address A)
2. Compute calls square (saves address B)
3. Square returns to address B (in compute)
4. Compute returns to address A (in main)

## Procedure with Local Variables

Use the stack for local variables:

```shell
section .text
    MOV AX, 10
    CALL calc_sum_square
    INT 3                ; Print result

calc_sum_square:
    PUSH BP
    MOV BP, SP
    SUB SP, 4            ; Allocate 2 local variables
    
    ; [BP-2] = square of AX
    ; [BP-4] = AX + square
    
    MUL AX               ; AX = AX * AX = 100
    MOV [BP-2], AX       ; Store square
    MOV AX, 10           ; Restore original value
    ADD AX, [BP-2]       ; AX = 10 + 100 = 110
    
    MOV SP, BP           ; Deallocate locals
    POP BP
    RET
```
<!-- console cpu memory --> 

## Practical Example: Factorial

Calculate factorial using recursion:

```shell
section .text
    MOV AX, 5            ; Calculate 5!
    CALL factorial
    INT 3                ; Print 120

factorial:
    CMP AX, 1            ; Base case: if n <= 1
    JLE base_case
    PUSH AX              ; Save n
    SUB AX, 1            ; n - 1
    CALL factorial       ; factorial(n-1)
    POP BX               ; Restore n
    MUL BX               ; n * factorial(n-1)
    RET
base_case:
    MOV AX, 1            ; Return 1
    RET
```
<!-- console cpu memory --> 

**Call trace for factorial(5):**
1. factorial(5) calls factorial(4)
2. factorial(4) calls factorial(3)
3. factorial(3) calls factorial(2)
4. factorial(2) calls factorial(1)
5. Returns: 1 → 2 → 6 → 24 → 120

## Best Practices

### 1. Always Balance PUSH and POP
```shell
PUSH AX
PUSH BX
; ... code ...
POP BX               ; Must match order!
POP AX
```

### 2. Preserve Registers
```shell
my_procedure:
    PUSH AX              ; Save any registers you modify
    PUSH BX
    ; ... procedure code ...
    POP BX               ; Restore in reverse order
    POP AX
    RET
```

### 3. Clean Up Stack After Calls
```shell
PUSH param2
PUSH param1
CALL my_proc
ADD SP, 4            ; Remove 2 parameters (2 words = 4 bytes)
```

### 4. Use BP for Stack Frames
```shell
PUSH BP              ; Standard stack frame setup
MOV BP, SP
; ... access parameters via [BP+offset] ...
MOV SP, BP           ; Standard cleanup
POP BP
RET
```

## Common Mistakes

### Mistake 1: Unbalanced Stack
```shell
PUSH AX
PUSH BX
POP AX               ; ❌ WRONG: Gets BX value!
```

### Mistake 2: Forgetting to Clean Stack
```shell
PUSH 10
CALL proc
; ❌ Missing: ADD SP, 2
RET                  ; Returns to wrong address!
```

### Mistake 3: Not Preserving Registers
```shell
my_proc:
    MOV BX, 5        ; ❌ Destroys caller's BX!
    RET              ; Should PUSH/POP BX
```

## Practice Exercises

### Exercise 1: Power Function
Write a procedure to calculate x^y:

```shell
section .text
    MOV AL, 2            ; Base
    MOV BL, 3            ; Exponent
    CALL power           ; Calculate 2^3
    MOV AH, 0
    INT 3                ; Should print 8

power:
    PUSH CX
    MOV CL, BL           ; Counter = exponent
    MOV AH, 1            ; Result = 1
power_loop:
    CMP CL, 0
    JE power_done
    MUL AL               ; Multiply result by base
    MOV AH, AL           ; Store intermediate result
    MOV AL, AL           ; Prepare for next iteration
    DEC CL
    JMP power_loop
power_done:
    MOV AL, AH
    POP CX
    RET
```
<!-- console cpu --> 

### Exercise 2: Is Prime
Check if a number is prime (basic version):

```shell
section .text
    MOV AL, 17
    CALL is_prime        ; Returns 1 if prime, 0 if not
    MOV AH, 0
    INT 3

is_prime:
    CMP AL, 2
    JL not_prime         ; Less than 2 is not prime
    CMP AL, 2
    JE is_prime_yes      ; 2 is prime
    MOV BL, 2
check_loop:
    PUSH AX
    MOV AH, 0
    DIV BL               ; Divide by BL
    CMP AH, 0            ; Check remainder
    POP AX
    JE not_prime         ; If remainder is 0, not prime
    INC BL
    CMP BL, AL
    JL check_loop
is_prime_yes:
    MOV AL, 1
    RET
not_prime:
    MOV AL, 0
    RET
```
<!-- console cpu --> 

## Summary

You've learned:
- ✅ PUSH and POP stack operations
- ✅ CALL and RET for procedures
- ✅ Preserving registers
- ✅ Passing parameters (registers and stack)
- ✅ Local variables using stack frames
- ✅ Recursive procedures
- ✅ Best practices and common mistakes

The stack and procedures are fundamental to writing organized, maintainable assembly code!

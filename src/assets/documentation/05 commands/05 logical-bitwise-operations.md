# Logical and Bitwise Operations

Master bit manipulation and logical operations in x86 assembly.

## Logical Instructions

### AND - Bitwise AND

Performs AND operation on each bit pair.

**Syntax:** `AND destination, source`

```shell
section .text
    MOV AL, 0b11001100   ; Binary: 11001100
    MOV BL, 0b10101010   ; Binary: 10101010
    AND AL, BL           ; Result: 10001000
    INT 3                ; Print 136
```
<!-- console cpu --> 

**Common use: Check if bit is set**
```shell
section .text
    MOV AL, 0b10110101
    AND AL, 0b00000100   ; Test bit 2
    CMP AL, 0
    JE bit_not_set       ; Jump if bit is 0
    MOV AX, 1            ; Bit is set
    JMP print
bit_not_set:
    MOV AX, 0            ; Bit is not set
print:
    INT 3
```
<!-- console cpu --> 

### OR - Bitwise OR

Performs OR operation on each bit pair.

```shell
section .text
    MOV AL, 0b11000011
    MOV BL, 0b00110011
    OR AL, BL            ; Result: 11110011
    INT 3                ; Print 243
```
<!-- console cpu --> 

**Common use: Set specific bits**
```shell
section .text
    MOV AL, 0b10100000
    OR AL, 0b00000101    ; Set bits 0 and 2
    INT 3                ; Result: 10100101 = 165
```
<!-- console cpu --> 

### XOR - Bitwise XOR (Exclusive OR)

Performs XOR operation (1 if bits differ, 0 if same).

```shell
section .text
    MOV AL, 0b11001100
    MOV BL, 0b10101010
    XOR AL, BL           ; Result: 01100110
    INT 3                ; Print 102
```
<!-- console cpu --> 

**Common use: Toggle bits**
```shell
section .text
    MOV AL, 0b11110000
    XOR AL, 0b00110011   ; Toggle bits
    INT 3                ; Result: 11000011
```
<!-- console cpu --> 

**Clever trick: Zero a register (faster than MOV)**
```shell
section .text
    MOV AX, 1234         ; Some value
    XOR AX, AX           ; AX = 0 (faster than MOV AX, 0)
    INT 3                ; Print 0
```
<!-- console cpu --> 

### NOT - Bitwise NOT

Inverts all bits (one's complement).

```shell
section .text
    MOV AL, 0b11001100   ; 204
    NOT AL               ; Result: 00110011 = 51
    INT 3
```
<!-- console cpu --> 

## Shift Operations

### SHL - Shift Left

Shifts bits left, fills with zeros.

```shell
section .text
    MOV AL, 0b00001111   ; 15
    SHL AL, 2            ; Shift left 2 positions
    INT 3                ; Result: 00111100 = 60
```
<!-- console cpu --> 

**Use: Multiply by powers of 2**
```shell
section .text
    MOV AL, 5
    SHL AL, 1            ; 5 × 2 = 10
    SHL AL, 1            ; 10 × 2 = 20
    SHL AL, 1            ; 20 × 2 = 40
    MOV AH, 0
    INT 3
```
<!-- console cpu --> 

### SHR - Shift Right

Shifts bits right, fills with zeros.

```shell
section .text
    MOV AL, 0b11110000   ; 240
    SHR AL, 2            ; Shift right 2 positions
    INT 3                ; Result: 00111100 = 60
```
<!-- console cpu --> 

**Use: Divide by powers of 2**
```shell
section .text
    MOV AL, 80
    SHR AL, 1            ; 80 ÷ 2 = 40
    SHR AL, 1            ; 40 ÷ 2 = 20
    MOV AH, 0
    INT 3
```
<!-- console cpu --> 

### ROL - Rotate Left

Rotates bits left (wrap around).

```shell
section .text
    MOV AL, 0b11000011
    ROL AL, 2            ; Rotate left 2 positions
    INT 3                ; Result: 00001111
```
<!-- console cpu --> 

### ROR - Rotate Right

Rotates bits right (wrap around).

```shell
section .text
    MOV AL, 0b11000011
    ROR AL, 2            ; Rotate right 2 positions
    INT 3                ; Result: 11110000
```
<!-- console cpu --> 

## Practical Examples

### Check if Number is Even or Odd

```shell
section .data
num: db 17

section .text
    MOV AL, [num]
    AND AL, 1            ; Check least significant bit
    CMP AL, 0
    JE is_even
    MOV AX, 1            ; Odd
    JMP print
is_even:
    MOV AX, 0            ; Even
print:
    INT 3
```
<!-- console cpu memory --> 

### Extract Nibble (4 bits)

Get lower 4 bits:
```shell
section .text
    MOV AL, 0b11011010   ; 218
    AND AL, 0x0F         ; Mask lower nibble
    INT 3                ; Result: 00001010 = 10
```
<!-- console cpu --> 

Get upper 4 bits:
```shell
section .text
    MOV AL, 0b11011010   ; 218
    SHR AL, 4            ; Shift to lower position
    INT 3                ; Result: 00001101 = 13
```
<!-- console cpu --> 

### Set Specific Bit

Set bit 3 (counting from 0):
```shell
section .data
flags: db 0b00000000

section .text
    MOV AL, [flags]
    OR AL, 0b00001000    ; Set bit 3
    INT 3                ; Result: 00001000 = 8
```
<!-- console cpu memory --> 

### Clear Specific Bit

Clear bit 5:
```shell
section .text
    MOV AL, 0b11111111   ; All bits set
    AND AL, 0b11011111   ; Clear bit 5 (NOT of bit mask)
    INT 3                ; Result: 11011111 = 223
```
<!-- console cpu --> 

### Toggle Specific Bit

Toggle bit 2:
```shell
section .text
    MOV AL, 0b00001100
    XOR AL, 0b00000100   ; Toggle bit 2
    INT 3                ; Result: 00001000
```
<!-- console cpu --> 

### Count Set Bits

Count how many bits are 1:
```shell
section .text
    MOV AL, 0b10110101   ; 181 (has 5 bits set)
    MOV BL, 0            ; Counter
    MOV CX, 8            ; 8 bits to check
count_loop:
    TEST AL, 1           ; Check LSB
    JZ skip_increment
    INC BL               ; Increment if bit is 1
skip_increment:
    SHR AL, 1            ; Shift to next bit
    LOOP count_loop
    MOV AL, BL
    MOV AH, 0
    INT 3                ; Print 5
```
<!-- console cpu --> 

### Swap Nibbles

Swap upper and lower 4 bits:
```shell
section .text
    MOV AL, 0b11110000   ; 240
    MOV BL, AL           ; Save original
    AND AL, 0x0F         ; Get lower nibble
    SHL AL, 4            ; Move to upper
    SHR BL, 4            ; Get original upper nibble
    OR AL, BL            ; Combine
    INT 3                ; Result: 00001111 = 15
```
<!-- console cpu --> 

### Create Bit Mask

Create mask with bits 2-5 set:
```shell
section .text
    MOV AL, 0
    OR AL, 0b00111100    ; Set bits 2,3,4,5
    INT 3                ; Result: 60
```
<!-- console cpu --> 

### Check Multiple Flags

Check if bits 0, 2, and 4 are all set:
```shell
section .data
status: db 0b10110101

section .text
    MOV AL, [status]
    AND AL, 0b00010101   ; Mask bits 0,2,4
    CMP AL, 0b00010101   ; Check if all are set
    JE all_set
    MOV AX, 0            ; Not all set
    JMP print
all_set:
    MOV AX, 1            ; All set
print:
    INT 3
```
<!-- console cpu memory --> 

### Reverse Bits in Byte

```shell
section .text
    MOV AL, 0b11010010   ; Original: 210
    MOV BL, 0            ; Result
    MOV CX, 8            ; 8 bits
reverse_loop:
    SHL BL, 1            ; Make room for new bit
    SHR AL, 1            ; Get next bit from AL
    JNC skip_set         ; If carry is 0, skip
    OR BL, 1             ; Set LSB in result
skip_set:
    LOOP reverse_loop
    MOV AL, BL
    MOV AH, 0
    INT 3                ; Result: 01001011 = 75
```
<!-- console cpu --> 

### Parity Check (Even/Odd number of 1s)

```shell
section .text
    MOV AL, 0b10110110   ; Has 5 ones (odd parity)
    MOV BL, 0            ; Counter
    MOV CX, 8
parity_loop:
    TEST AL, 1
    JZ skip_inc
    INC BL
skip_inc:
    SHR AL, 1
    LOOP parity_loop
    AND BL, 1            ; Keep only LSB (odd=1, even=0)
    MOV AL, BL
    MOV AH, 0
    INT 3                ; Print 1 (odd parity)
```
<!-- console cpu --> 

## Practice Exercises

### Exercise 1: Isolate Bit
Extract bit 3 from a byte (return 0 or 1):

```shell
section .data
value: db 0b10101101

section .text
    MOV AL, [value]
    SHR AL, 3            ; Shift bit 3 to position 0
    AND AL, 1            ; Isolate it
    MOV AH, 0
    INT 3                ; Print 1
```
<!-- console cpu memory --> 

### Exercise 2: Pack Two Nibbles
Combine two 4-bit values into one byte:

```shell
section .data
upper: db 0x0A           ; Upper nibble
lower: db 0x05           ; Lower nibble

section .text
    MOV AL, [upper]
    SHL AL, 4            ; Move to upper position
    OR AL, [lower]       ; Combine with lower
    INT 3                ; Result: 0xA5 = 165
```
<!-- console cpu memory --> 

### Exercise 3: Test Multiple Bits
Check if at least one of bits 1, 3, or 5 is set:

```shell
section .data
flags: db 0b01001000

section .text
    MOV AL, [flags]
    AND AL, 0b00101010   ; Mask bits 1,3,5
    CMP AL, 0
    JNE at_least_one     ; At least one bit is set
    MOV AX, 0
    JMP print
at_least_one:
    MOV AX, 1
print:
    INT 3
```
<!-- console cpu memory --> 

## Summary

You've learned:
- ✅ Logical operations: AND, OR, XOR, NOT
- ✅ Shift operations: SHL, SHR, ROL, ROR
- ✅ Bit manipulation techniques
- ✅ Setting, clearing, and toggling bits
- ✅ Checking and counting bits
- ✅ Practical applications and patterns

Bitwise operations are essential for low-level programming, hardware control, and optimization!

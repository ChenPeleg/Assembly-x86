# CPU Flags Reference

"Use of mnemonics" demonstrations
Effect on flags
This test demonstrates how various operations affect the flags. See Conditional jump and use of flags test to see how to use the flags to switch execution to different code areas. For this demonstration, set the breakpoint to FLAG_DEMONSTRATION then single-step through the code.

;********************* first the zero flag
;
MOV EAX,33333333h
CMP EAX,33h            ;see how flag is clear showing not zero
CMP EAX,33333333h      ;see how flag is set showing zero
CMP EAX,4              ;see how flag is clear showing not zero
MOV EAX,4              ;see how MOV does not change flag
CMP EAX,4              ;see how flag is set showing zero
;
MOV EAX,33333333h
OR EAX,EAX             ;see its the same as CMP EAX,0
MOV EAX,0
OR EAX,EAX
;
INC EAX                ;INC changes flag (now clear showing not zero)
XOR EAX,EAX            ;this zeroes EAX and changes flag
;
MOV EAX,2
DEC EAX                ;DEC changes zero flag
DEC EAX                ;so reaching zero using DEC sets zero flag
;
MOV EAX,3
SHR EAX,1              ;the shift instructions change zero flag
SHR EAX,1              ;so reaching zero using SHR sets zero flag
;
MOV EAX,0FFFFFFFFh
OR EAX,EAX
INC EAX                ;reaching zero using INC sets zero flag
;
DEC EAX
OR AX,AX
INC AX                 ;reaching 16-bit zero using INC
;
DEC EAX
OR AL,AL
INC AL                 ;reaching 8-bit zero using INC
;
MOV EAX,1
TEST EAX,1             ;using TEST - testing the first bit returns not zero
MOV EAX,0
TEST EAX,1             ;this time testing the first bit returns zero
MOV EBX,-1
TEST EBX,-1            ;test all 32 bits - zero flag not set
CMP EBX,-1             ;see if ebx is -1 - zero flag set
;
;********************* now lets look at the sign flag
;
MOV EAX,33333333h
CMP EAX,33h            ;sign flag is clear because 32nd bit is clear
MOV EAX,0B3333333h
CMP EAX,33h            ;sign flag is set because 32nd bit is set
;
MOV EAX,33333333h
OR EAX,EAX             ;see that OR changes the sign flag too
;
MOV EAX,80000000h
OR EAX,EAX             ;sign flag is set because 32nd bit is set
DEC EAX                ;DEC changes the sign flag (now clear)
INC EAX                ;INC changes the sign flag (now set)
;
MOV AX,8000h
DEC AX                 ;16-bit instructions test the 16th bit
INC AX
;
MOV AL,80h
DEC AL                 ;8-bit instructions test the 8th bit
INC AL
;
## Carry Flag (CF)

The carry flag (CF) indicates unsigned integer overflow. It is set when an arithmetic operation generates a carry out from the most significant bit (for addition) or requires a borrow (for subtraction).

The carry flag is useful for:
- Multi-precision arithmetic (adding/subtracting large numbers)
- Detecting unsigned overflow
- Shift and rotate operations

### Example 1: Basic Carry Flag Control

You can directly manipulate the carry flag with these instructions:

```nasm
STC                    ;set carry flag (CF = 1)
CLC                    ;clear carry flag (CF = 0)
CMC                    ;complement carry flag (toggle)
```
<!-- -console -memory cpu -->

> **Try it**: Step through this example to see how STC, CLC, and CMC affect the carry flag.

### Example 2: Addition Overflow

The carry flag is set when addition produces a result larger than the register can hold (unsigned overflow).

```nasm
MOV EAX,0FFFFFFFFh     ;EAX = maximum 32-bit value (4,294,967,295)
ADD EAX,1              ;CF is set (overflow: result would be 4,294,967,296)
ADD EAX,1              ;CF is clear (result fits in 32 bits)
```
<!-- -console -memory cpu -->

> **Try it**: Watch the carry flag when adding to the maximum value.

### Example 3: Subtraction Borrow

The carry flag is set when subtraction requires a borrow.

```nasm
MOV EAX,5
SUB EAX,10             ;CF is set (5 - 10 requires borrow in unsigned)
MOV EAX,10
SUB EAX,5              ;CF is clear (10 - 5 is valid)
```
<!-- -console -memory cpu -->

> **Try it**: See how the carry flag indicates when subtraction requires a borrow.

### Example 4: INC and DEC Don't Affect Carry Flag

Unlike ADD and SUB, INC and DEC do not change the carry flag.

```nasm
STC                    ;set carry flag to 1
INC EAX                ;CF remains set (INC doesn't change it)
DEC EAX                ;CF still set (DEC doesn't change it)
CLC                    ;clear carry flag to 0
INC EAX                ;CF remains clear
DEC EAX                ;CF still clear
```
<!-- -console -memory cpu -->

> **Try it**: Notice that INC and DEC preserve the carry flag value.

### Example 5: Logical Operations Clear Carry Flag

Logical operations (AND, OR, XOR, TEST) always clear the carry flag.

```nasm
STC                    ;set carry flag
AND EAX,45h            ;CF is cleared (AND always clears it)
STC                    ;set carry flag again
OR EAX,EAX             ;CF is cleared (OR always clears it)
STC                    ;set carry flag again
XOR EAX,EAX            ;CF is cleared (XOR always clears it)
STC                    ;set carry flag again
TEST EAX,EAX           ;CF is cleared (TEST always clears it)
```
<!-- -console -memory cpu -->

> **Try it**: See how logical operations always clear the carry flag.

### Example 6: Shift Operations and Carry Flag

Shift instructions use the carry flag to capture shifted-out bits.

```nasm
MOV EAX,0FFFFFFFFh     ;all bits set
SHR EAX,1              ;CF gets the bit shifted out (bit 0, which is 1)
SHR EAX,1              ;CF gets the next bit shifted out (bit 1, which is 1)
MOV EAX,0FFFFFFFEh     ;all bits set except bit 0
SHR EAX,1              ;CF gets bit 0, which is 0
```
<!-- -console -memory cpu -->

> **Try it**: Watch how the shifted-out bit goes into the carry flag.

### Example 7: Carry Flag with Different Data Sizes

Operations on smaller data sizes (16-bit, 8-bit) only consider those bits.

```nasm
MOV EAX,0FFFFh         ;set lower 16 bits
ADD AX,-1              ;16-bit operation: CF is set (0FFFFh + FFFFh overflow)
MOV AL,0FFh            ;set lower 8 bits
ADD AL,-1              ;8-bit operation: CF is set (0FFh + FFh overflow)
```
<!-- -console -memory cpu -->

> **Try it**: See how carry flag works with 16-bit and 8-bit operations.

;********************* now lets look at the overflow flag
;
; The overflow flag (OF) indicates signed integer overflow.
; It is set when the result of an arithmetic operation exceeds
; the range that can be represented with signed integers.
;
; For 32-bit signed integers: range is -2,147,483,648 to 2,147,483,647
; For 16-bit signed integers: range is -32,768 to 32,767
; For 8-bit signed integers: range is -128 to 127
;
; Overflow occurs when:
; - Adding two positive numbers produces a negative result
; - Adding two negative numbers produces a positive result
; - Subtracting a positive from a negative produces a positive
; - Subtracting a negative from a positive produces a negative
;
MOV AL,127               ;AL = 127 (maximum 8-bit signed positive)
ADD AL,1                 ;result is 128, interpreted as -128 in signed, OF is set
;
MOV AL,-128              ;AL = -128 (minimum 8-bit signed negative)
SUB AL,1                 ;result would be -129, becomes 127 in 8-bit signed, OF is set
;
MOV AL,100
ADD AL,20                ;no overflow, result is 120, OF is clear
;
MOV AL,50
ADD AL,50                ;no overflow, result is 100, OF is clear
;
MOV AL,100
ADD AL,100               ;overflow! 200 exceeds 127, OF is set
;
MOV AL,-100
ADD AL,-100              ;overflow! -200 is less than -128, OF is set
;
MOV AX,32767             ;AX = 32767 (maximum 16-bit signed positive)
ADD AX,1                 ;result is 32768, interpreted as -32768 in signed, OF is set
;
MOV EAX,2147483647       ;EAX = maximum 32-bit signed positive
ADD EAX,1                ;result is 2147483648, interpreted as -2147483648, OF is set
;
; Note: Use JO (jump if overflow) or JNO to branch based on OF
; The overflow flag is different from the carry flag:
; - OF is for signed arithmetic overflow
; - CF is for unsigned arithmetic carry/borrow
;
;********************* now lets look at the auxiliary carry flag
;
; The auxiliary carry flag (AF) indicates a carry or borrow 
; from the lower nibble (bits 0-3) to the upper nibble (bits 4-7).
; This flag is primarily used for Binary Coded Decimal (BCD) arithmetic.
;
; A nibble is 4 bits, representing values 0-15.
; AF is set when:
; - Addition causes a carry from bit 3 to bit 4
; - Subtraction causes a borrow into bit 4
;
; Example with addition:
; Adding 0x0F (00001111) + 0x01 (00000001)
; Lower nibble: F + 1 = 10 (hex), which requires carry to upper nibble
;
MOV AL,0Fh               ;AL = 15 (lower nibble is all 1s)
ADD AL,1                 ;AF is set (carry from bit 3 to bit 4)
;
MOV AL,08h               ;AL = 8
ADD AL,08h               ;AF is set (8+8=16, carry from lower nibble)
;
MOV AL,07h               ;AL = 7
ADD AL,08h               ;AF is clear (7+8=15, no carry from bit 3)
;
MOV AL,0Fh               ;AL = 15
ADD AL,0Fh               ;AF is set (15+15=30, carry from lower nibble)
;
MOV AL,10h               ;AL = 16
SUB AL,01h               ;AF is set (borrow from bit 4)
;
MOV AL,20h               ;AL = 32
SUB AL,10h               ;AF is clear (no borrow needed)
;
; The AF flag is used by special BCD adjustment instructions:
; DAA (Decimal Adjust after Addition)
; DAS (Decimal Adjust after Subtraction)
; These instructions use AF to correct results for BCD arithmetic
;
; Example: BCD addition
MOV AL,38h               ;AL = 38 in BCD (represents decimal 38)
ADD AL,27h               ;AL = 5Fh, but we want BCD result
DAA                      ;Decimal adjust: AL becomes 65h (decimal 65)
;
; Note: Most modern programs don't use BCD arithmetic,
; so AF is rarely checked directly in typical assembly code.
;

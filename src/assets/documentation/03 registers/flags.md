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
;********************* now lets look at the carry flag
;
STC                    ;set carry flag
CLC                    ;clear carry flag
CMC                    ;complement carry flag
CMC                    ;complement carry flag
MOV EAX,-1
ADD EAX,1              ;ADD changes carry flag
ADD EAX,1              ;now clear because result not over data size
SUB EAX,2              ;SUB changes carry flag
INC EAX                ;but INC does not
DEC EAX                ;nor DEC
AND EAX,45h            ;AND always clears carry flag
SHR EAX,1              ;shift instructions use carry flag
XOR EAX,EAX            ;zeroing the register will clear it
ADD EAX,8              ;remains clear because result not over data size
ADD EAX,-1             ;but this is over data size
OR EAX,EAX             ;OR always clears the carry flag
ADD AX,-1              ;16-bit instruction deals with first 16 bits only
TEST EAX,EAX           ;TEST always clears the carry flag
ADD AL,-1              ;8-bit instruction deals with first 8 bits only
;
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

"Use of mnemonics" demonstrations
Effect on flags
This test demonstrates how various operations effect the flags. See Conditional jump and use of flags test to see how to use the flags to switch execution to different code areas. For this demonstration, set the breakpoint to FLAG_DEMONSTRATION then single-step through the code.

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
under construction
;
;********************* now lets look at the auxiliary carry flag
;
under construction

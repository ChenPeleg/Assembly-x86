# Instruction cheat sheet

| Group      | Instructions                                                                    |
|------------|---------------------------------------------------------------------------------|
| Data       | `MOV` `PUSH` `POP`                                                      |
| Arithmetic | `ADD` `ADC` `SUB` `SBB` `INC` `DEC` `IMUL` `IDIV`                   |
| Logic      | `AND` `OR` `XOR`                                                                |
| Compare    | `CMP`                                                                           |
| Jumps      | `JMP` `JE/JZ` `JNE/JNZ` `JB/JC/JNAE` `JAE/JNC/JNB` `JA` `JNA` `JL/JNGE` `JGE/JNL` `JG` `JNG` `JS` `JNS` `JO` `JNO` `JP` `JNP` `LOOP` |
| Procedures | `CALL` `RET` `ENTER` `LEAVE`                                                    |
| Flags      | `CLC` `STC` `CLD` `STD`                                                         |
| System     | `INT 1` (print number in `EAX`), `INT 2` (print string at `EAX`), `HLT`         |

`IMUL/IDIV` take one operand and use `EAX` and `EDX`.

## Registers

`EAX EBX ECX EDX ESI EDI EBP ESP EIP`, 16-bit `AX BX CX DX SI DI`, 8-bit `AH AL BH BL CH CL DH DL`.

## Flags

`CF ZF OF SF PF DF`

## Addressing

`[reg]`, `[reg + reg*scale + disp]`, `[label + ...]`, `[number]`, with `byte`, `word` or `dword` casts.

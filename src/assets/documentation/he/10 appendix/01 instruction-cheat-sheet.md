# דף עזר להוראות

| קבוצה      | הוראות                                                                    |
|------------|---------------------------------------------------------------------------------|
| נתונים       | `MOV` `PUSH` `POP`                                                      |
| חשבון | `ADD` `ADC` `SUB` `SBB` `INC` `DEC` `IMUL` `IDIV`                   |
| לוגיקה      | `AND` `OR` `XOR`                                                                |
| השוואה    | `CMP`                                                                           |
| קפיצות      | `JMP` `JE/JZ` `JNE/JNZ` `JB/JC/JNAE` `JAE/JNC/JNB` `JA` `JNA` `JL/JNGE` `JGE/JNL` `JG` `JNG` `JS` `JNS` `JO` `JNO` `JP` `JNP` `LOOP` |
| פרוצדורות | `CALL` `RET` `ENTER` `LEAVE`                                                    |
| דגלים      | `CLC` `STC` `CLD` `STD`                                                         |
| מערכת     | `INT 1` (הדפסת המספר שב-`EAX`), `INT 2` (הדפסת המחרוזת שבכתובת `EAX`), `HLT`         |

`IMUL/IDIV` מקבלות אופרנד אחד ומשתמשות ב-`EAX` וב-`EDX`.

## אוגרים

`EAX EBX ECX EDX ESI EDI EBP ESP EIP`, אוגרים של 16 ביטים: `AX BX CX DX SI DI`, אוגרים של 8 ביטים: `AH AL BH BL CH CL DH DL`.

## דגלים

`CF ZF OF SF PF DF`

## מיעון

`[reg]`, `[reg + reg*scale + disp]`, `[label + ...]`, `[number]`, עם ציון גודל `byte`, `word` או `dword`.

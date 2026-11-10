# חיבור וחיסור

| הוראה     | משמעות                              |
|-----------------|--------------------------------------|
| `ADD dst, src`  | `dst = dst + src`                    |
| `SUB dst, src`  | `dst = dst - src`                    |
| `INC dst`       | `dst = dst + 1` (CF לא משתנה)       |
| `DEC dst`       | `dst = dst - 1` (CF לא משתנה)       |
| `ADC dst, src`  | `dst = dst + src + CF`               |
| `SBB dst, src`  | `dst = dst - src - CF`               |

```shell
section .text
    MOV EAX, 10
    ADD EAX, 5       ; 15
    SUB EAX, 3       ; 12
    INC EAX          ; 13
    DEC EAX          ; 12
    INT 1
```
<!-- console -memory cpu -->

כל ההוראות האלה מעדכנות את ZF, SF, CF, OF ו-PF (חוץ מ-`INC`/`DEC`, שלא נוגעות ב-CF).

## חיבור מספרים גדולים: ADC ו-SBB

אוגר של 32 ביטים לא יכול להחזיק מספר של 64 ביטים, אבל שני אוגרים יכולים. מחברים קודם את החלקים התחתונים, ואחר כך את החלקים העליונים **ועוד הנשא**.

```shell
section .text
    ; 0x00000001_FFFFFFFF + 0x00000000_00000001
    MOV EAX, 0xFFFFFFFF   ; low part
    MOV EDX, 1            ; high part
    ADD EAX, 1            ; EAX = 0, CF = 1
    ADC EDX, 0            ; EDX = 2: the carry moved up
```
<!-- -console -memory cpu -->

`SBB` עושה את אותו הדבר בחיסור, בעזרת הלווה (borrow).

<strong>נסו בעצמכם:</strong> החליפו את `ADC EDX, 0` ב-`ADD EDX, 0` וראו איך הנשא הולך לאיבוד.

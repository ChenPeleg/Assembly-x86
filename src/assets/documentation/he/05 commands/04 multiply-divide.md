# כפל וחילוק

ההוראות עם הסימן מקבלות אופרנד אחד ועובדות עם `EAX` ו-`EDX`.

| הוראה | תוצאה                                                           |
|-------------|------------------------------------------------------------------|
| `IMUL src`  | `EDX:EAX = EAX * src` (עם סימן)                                   |
| `IDIV src`  | `EAX = EDX:EAX / src`, `EDX = remainder` (עם סימן)                |

`EDX:EAX` הוא מספר של 64 ביטים: `EDX` מחזיק את 32 הביטים העליונים.

```shell
section .text
    MOV EAX, 6
    MOV EBX, 7
    IMUL EBX         ; EAX = 42
    INT 1
```
<!-- console -memory cpu -->

## חילוק

`EDX` הוא חלק מהמחולק. כש-`EAX` חיובי, שימו ב-`EDX` את 0; כש-`EAX` שלילי, שימו בו `-1`.

```shell
section .text
    MOV EAX, 17
    MOV EDX, 0
    MOV EBX, 5
    IDIV EBX         ; EAX = 3 (quotient), EDX = 2 (remainder)
    INT 1
```
<!-- console -memory cpu -->

```shell
section .text
    MOV EAX, -17
    MOV EDX, -1      ; sign extension of EAX
    MOV EBX, 5
    IDIV EBX         ; EAX = -3, EDX = -2
```
<!-- -console -memory cpu -->

<!-- warning -->
> חילוק באפס עוצר את התוכנית עם השגיאה **Division by zero**.

<!-- notice -->
> האסמבלר מזהה את `MUL` ו-`DIV` (ללא סימן), אבל הן עדיין לא ממומשות. השתמשו ב-`IMUL` וב-`IDIV`.

<strong>נסו בעצמכם:</strong> שימו 0 ב-`EBX` והריצו את החילוק.

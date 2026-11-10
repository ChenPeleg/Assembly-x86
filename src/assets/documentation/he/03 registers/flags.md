# דגלי המעבד

דגלים (flags) הם ביטים בודדים שמתעדים מה קרה בהוראת החשבון או הלוגיקה האחרונה. הוראות קפיצה כמו `JE` או `JL` קוראות אותם כדי לקבל החלטות. עקבו אחריהם בחלונית ה-CPU בזמן שאתם מריצים כל דוגמה צעד אחר צעד.

| דגל | שם     | דולק כאשר                                                  |
|------|----------|-----------------------------------------------------------|
| ZF   | Zero     | התוצאה היא 0                                           |
| SF   | Sign     | הביט העליון של התוצאה הוא 1 (שלילי כמספר עם סימן)       |
| CF   | Carry    | תוצאה ללא סימן לא נכנסת (נשא החוצה / לווה)      |
| OF   | Overflow | תוצאה עם סימן לא נכנסת                              |
| PF   | Parity   | בבית התחתון של התוצאה יש מספר זוגי של ביטים דולקים |
| DF   | Direction| מודלק ידנית עם `STD`, ומכובה עם `CLD`               |

## דגל האפס (ZF)

```shell
section .text
    MOV EAX, 5
    CMP EAX, 3     ; 5 - 3 = 2, ZF = 0
    CMP EAX, 5     ; 5 - 5 = 0, ZF = 1
    MOV EAX, 1
    DEC EAX        ; reaches 0, ZF = 1
```
<!-- -console -memory cpu -->

`MOV` אף פעם לא משנה דגלים. `CMP` מחסר בלי לשמור את התוצאה.

## דגל הסימן (SF)

```shell
section .text
    MOV EAX, 1
    SUB EAX, 2     ; result is -1, SF = 1
    ADD EAX, 5     ; result is 4, SF = 0
```
<!-- -console -memory cpu -->

## דגל הנשא (CF)

CF מסמן גלישה של מספרים **ללא סימן**.

```shell
section .text
    MOV EAX, 0xFFFFFFFF
    ADD EAX, 1     ; 4294967296 does not fit in 32 bits: EAX = 0, CF = 1, ZF = 1
    MOV EAX, 1
    SUB EAX, 2     ; borrow: CF = 1
    CLC            ; clear carry
    STC            ; set carry
```
<!-- -console -memory cpu -->

`INC` ו-`DEC` לא משנים את CF.

## דגל הגלישה (OF)

OF מסמן גלישה של מספרים **עם סימן**.

```shell
section .text
    MOV EAX, 0x7FFFFFFF  ; biggest signed number
    ADD EAX, 1           ; wraps to -2147483648: OF = 1, SF = 1, CF = 0
    MOV EAX, 100
    ADD EAX, 20          ; 120 fits: OF = 0
```
<!-- -console -memory cpu -->

אותם ביטים מייצגים מספרים שונים כשקוראים אותם עם סימן או בלי סימן, ולכן `ADD` אחד יכול להדליק את CF ולא את OF, או להפך: `0xFFFFFFFF + 1` מדליק את CF אבל לא את OF (`-1 + 1 = 0`).

<!-- info -->
> האמולטור מחשב את הדגלים על כל האוגר של 32 ביטים, ולכן השתמשו בערכים בגודל של `EAX` כדי לראות את CF ו-OF.

## דגל הזוגיות (PF)

```shell
section .text
    MOV EAX, 3
    OR EAX, EAX    ; 00000011 has two 1 bits (even): PF = 1
    MOV EAX, 7
    OR EAX, EAX    ; three 1 bits (odd): PF = 0
```
<!-- -console -memory cpu -->

## שימוש בדגלים

```shell
section .text
    MOV ECX, 3
again:
    DEC ECX
    JNZ again      ; jump while ZF = 0
```
<!-- -console -memory cpu -->

<!-- notice -->
> באמולטור הזה אין את הדגל `AF` (נשא עזר), ואין את ההוראות `TEST` ו-`CMC`. השתמשו במקומן ב-`CMP`, `AND` ו-`CLC`/`STC`.

<strong>נסו בעצמכם:</strong> שנו את `0x7FFFFFFF` ל-`0x7FFFFFFE` וראו ש-OF נשאר כבוי.

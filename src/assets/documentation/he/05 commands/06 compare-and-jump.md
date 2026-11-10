# השוואה וקפיצה

`CMP a, b` מחשבת את `a - b`, זורקת את התוצאה ושומרת רק את הדגלים.
אחר כך הוראת קפיצה מותנית קוראת את הדגלים האלה.

```shell
section .text
    MOV EAX, 5
    CMP EAX, 5
    JE equal         ; jump if ZF = 1
    MOV EBX, 1
    HLT
equal:
    MOV EBX, 2
```
<!-- -console -memory cpu -->

`JMP label` קופצת תמיד.

## קפיצות מותנות

בחרו במשפחה של ההוראות עם סימן או בלי סימן, לפי האופן שבו אתם מתייחסים למספרים.

| משמעות             | ללא סימן        | עם סימן          |
|---------------------|-----------------|-----------------|
| שווה               | `JE` / `JZ`     | `JE` / `JZ`     |
| לא שווה           | `JNE` / `JNZ`   | `JNE` / `JNZ`   |
| קטן מ-             | `JB` / `JC`     | `JL`            |
| גדול או שווה | `JAE` / `JNC` | `JGE` |
| קטן או שווה | `JNA` | `JNG` |
| גדול מ-     | `JA`            | `JG`            |

קפיצות לפי דגל: `JS` / `JNS` (סימן), `JO` / `JNO` (גלישה), `JP` ו-`JNP` (זוגיות).

<!-- notice -->
> האסמבלר עדיין לא מקבל את `JBE`, `JLE`, `JPE`, `JPO`, `JNBE` ו-`JNLE`; השתמשו במקבילות שלהן: `JNA`, `JNG`, `JP`, `JNP`, `JA` ו-`JG`.

```shell
section .text
    MOV EAX, -1
    CMP EAX, 1
    JL less           ; taken: -1 < 1 as signed numbers
    MOV EBX, 1
    HLT
less:
    MOV EBX, 2
```
<!-- -console -memory cpu -->

`JL`/`JG` מתייחסות למספרים כמספרים עם סימן (הן קוראות את SF ו-OF). `JB`/`JA` מתייחסות אליהם כמספרים ללא סימן (הן קוראות את CF).
בחרו במשפחה שמתאימה לנתונים שלכם.

## If / else

```shell
section .text
    MOV EAX, 7
    CMP EAX, 10
    JGE big
    MOV EBX, 0        ; EAX < 10
    JMP done
big:
    MOV EBX, 1        ; EAX >= 10
done:
```
<!-- -console -memory cpu -->

<strong>נסו בעצמכם:</strong> שנו את 7 ל-12 ובדקו את `EBX`.

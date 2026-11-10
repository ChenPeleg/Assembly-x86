# העברת נתונים

| הוראה      | משמעות                                         |
|------------------|-------------------------------------------------|
| `MOV dst, src`   | העתקת `src` אל `dst`                             |
| `PUSH src`       | הקטנת `ESP` ב-4 ושמירת `src` במחסנית   |
| `POP dst`        | טעינה מהמחסנית אל `dst` והגדלת `ESP`  |

`MOV` לא יכול להעתיק מזיכרון לזיכרון, ושני האופרנדים חייבים להיות באותו גודל.

```shell
section .text
    MOV EAX, 10
    MOV EBX, EAX     ; EBX = 10
    MOV ECX, 0
    MOV CL, byte 200 ; only the low byte of ECX
```
<!-- -console -memory cpu -->

<!-- info -->
> מספר רגיל הוא ברוחב 32 ביטים. כדי לשים אותו באוגר קטן יותר, ציינו את הגודל: `MOV AL, byte 5`, `MOV AX, word 5`.

## PUSH ו-POP

```shell
section .text
    PUSH 1
    PUSH 2
    POP EAX          ; EAX = 2 (last in, first out)
    POP EBX          ; EBX = 1
```
<!-- -console memory cpu -->

<strong>נסו בעצמכם:</strong> החליפו בין הערכים של שני אוגרים בעזרת `PUSH` ו-`POP` בלבד.

<!-- notice -->
> ההוראות `XCHG`, `LEA`, `MOVZX` ו-`NOP` לא נתמכות. `MOVSX` מזוהה, אבל עדיין לא ממומש.

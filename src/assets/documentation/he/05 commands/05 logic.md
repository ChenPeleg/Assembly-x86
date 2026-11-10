# לוגיקה ומסכות

| הוראה    | כל ביט בתוצאה הוא 1 כאשר...         |
|----------------|--------------------------------------|
| `AND dst, src` | שני הביטים הם 1                      |
| `OR dst, src`  | לפחות אחד מהביטים הוא 1                |
| `XOR dst, src` | הביטים שונים                      |

`AND`, `OR` ו-`XOR` מעדכנות את ZF, SF ו-PF, ומכבות את CF ו-OF.

```shell
section .text
    MOV EAX, 12       ; 1100
    AND EAX, 10       ; 1010 -> 1000 = 8
    MOV EBX, 12
    OR  EBX, 10       ; 1110 = 14
    MOV ECX, 12
    XOR ECX, 10       ; 0110 = 6
```
<!-- -console -memory cpu -->

## מסכות (Masks)

- **שמירה** על חלק מהביטים: `AND` עם 1 במקומות שרוצים לשמור.
- **הדלקה** של חלק מהביטים: `OR` עם 1 במקומות שרוצים להדליק.
- **היפוך** של חלק מהביטים: `XOR` עם 1 במקומות שרוצים להפוך.

```shell
section .text
    MOV EAX, 0x12AB
    AND EAX, 0xFF     ; keep the low byte: 0xAB
    OR  EAX, 0x100    ; set bit 8: 0x1AB
    XOR EAX, 0xFF     ; flip the low byte: 0x154
```
<!-- -console -memory cpu -->

## איפוס אוגר

`XOR EAX, EAX` מאפס את `EAX` (ומדליק את ZF). מספר הוא זוגי כש-`AND EAX, 1` נותן 0.

```shell
section .text
    MOV EAX, 77
    XOR EAX, EAX
```
<!-- -console -memory cpu -->

<!-- notice -->
> מספרים נכתבים בבסיס עשרוני או בבסיס 16 (`0x2A`). ההוראות `NOT`, `NEG`, `TEST` והוראות ההזזה והסיבוב (`SHL`, `SHR`,
> `SAR`, `ROL`, `ROR`) לא קיימות באמולטור. במקומן אפשר לכפול או לחלק בחזקות של 2.

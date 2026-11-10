# מיעון ומערכים

סוגריים מרובעים קוראים מהזיכרון. הכתובת יכולה לשלב עד ארבעה חלקים:

`[base + index*scale + displacement]`

- base הוא אוגר או תווית, index הוא אוגר **עם** מקדם (`ESI*4`, ואפילו `*1`), ו-displacement הוא מספר.

```shell
section .data
    nums: dd 10, 20, 30, 40
section .text
    MOV EAX, 0
    MOV EBX, 2
    MOV EAX, [nums + EBX*4]   ; third element: 30
    INT 1
```
<!-- console memory cpu word:4 -->

המקדם שווה לגודל האיבר: 4 עבור `dd`, 2 עבור `dw`, 1 עבור `db`.

## מעבר על מערך

```shell
section .data
    nums: dd 3, 1, 4, 1, 5
section .text
    MOV EAX, 0         ; sum
    MOV ESI, 0         ; index
    MOV ECX, 5
sum:
    ADD EAX, [nums + ESI*4]
    INC ESI
    LOOP sum
    INT 1              ; prints 14
```
<!-- console memory cpu word:4 -->

## מצביעים

אוגר יכול להחזיק כתובת.

```shell
section .data
    nums: dw 7, 8, 9
section .text
    MOV EBX, nums
    MOV AX, word [EBX]   ; 7
    MOV AX, word [EBX + 2] ; 8
    MOV AX, word [EBX + 4] ; 9
```
<!-- -console memory cpu word:2 -->

## מחרוזות

מחרוזת היא מערך של בתים שמסתיים ב-0.

```shell
section .data
    s: db 'abc', 0
section .text
    MOV EBX, s
    MOV AL, byte [EBX]   ; 97 = 'a'
    MOV byte [EBX], byte 65 ; change the first letter to 'A'
    MOV EAX, s
    INT 2                ; prints Abc
```
<!-- console memory cpu word:1 ascii -->

<strong>נסו בעצמכם:</strong> שנו את הלולאה שלמעלה כך שתמצא את המספר הגדול ביותר במקום את הסכום.

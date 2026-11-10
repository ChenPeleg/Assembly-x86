# תוכניות לתרגול

לכל תוכנית יש מטרה, פתרון והפלט הצפוי. נסו קודם לכתוב פתרון משלכם, ואז השוו.

## 1. סכום של 1 עד N

המטרה: להדפיס את הסכום `1 + 2 + ... + 10`. הפלט הצפוי: `55`

```shell
section .text
    MOV EAX, 0
    MOV ECX, 10
add_next:
    ADD EAX, ECX
    LOOP add_next
    INT 1
```
<!-- console -memory cpu -->

## 2. המקסימום במערך

המטרה: להדפיס את המספר הגדול ביותר. הפלט הצפוי: `9`

```shell
section .data
    nums: dd 3, 9, 2, 7, 5
section .text
    MOV EAX, [nums]
    MOV ESI, 1
    MOV ECX, 4
next:
    CMP EAX, [nums + ESI*4]
    JGE skip
    MOV EAX, [nums + ESI*4]
skip:
    INC ESI
    LOOP next
    INT 1
```
<!-- console memory cpu word:4 -->

## 3. אורך מחרוזת

המטרה: לספור את התווים שלפני ה-`0`. הפלט הצפוי: `5`

```shell
section .data
    s: db 'hello', 0
section .text
    MOV EAX, 0
count:
    CMP byte [s + EAX*1], byte 0
    JE done
    INC EAX
    JMP count
done:
    INT 1
```
<!-- console memory cpu word:1 ascii -->

## 4. פיבונאצ'י

המטרה: להדפיס את 10 מספרי פיבונאצ'י הראשונים. הפלט הצפוי: `1 1 2 3 5 8 13 21 34 55`

```shell
section .text
    MOV EBX, 0       ; previous
    MOV EDX, 1       ; current
    MOV ECX, 10
next:
    MOV EAX, EDX
    INT 1
    ADD EDX, EBX     ; next = current + previous
    MOV EBX, EAX     ; previous = old current
    LOOP next
```
<!-- console -memory cpu -->

## 5. המחלק המשותף הגדול ביותר

המטרה: למצוא את המחלק המשותף הגדול ביותר (GCD) של 48 ו-18 בעזרת האלגוריתם של אוקלידס. הפלט הצפוי: `6`

```shell
section .text
    MOV EAX, 48
    MOV EBX, 18
gcd:
    CMP EBX, 0
    JE done
    MOV EDX, 0
    IDIV EBX         ; EDX = EAX mod EBX
    MOV EAX, EBX
    MOV EBX, EDX
    JMP gcd
done:
    INT 1
```
<!-- console -memory cpu -->

## 6. היפוך מחרוזת

המטרה: להפוך את `abc` במקום ולהדפיס אותה. הפלט הצפוי: `cba`

```shell
section .data
    s: db 'abc', 0
section .text
    MOV ESI, 0
    MOV EDI, 2
swap:
    MOV AL, byte [s + ESI*1]
    MOV BL, byte [s + EDI*1]
    MOV byte [s + ESI*1], BL
    MOV byte [s + EDI*1], AL
    INC ESI
    DEC EDI
    CMP ESI, EDI
    JL swap
    MOV EAX, s
    INT 2
```
<!-- console memory cpu word:1 ascii -->

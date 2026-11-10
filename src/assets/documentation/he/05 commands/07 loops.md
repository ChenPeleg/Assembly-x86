# לולאות

## LOOP

`LOOP label` מקטינה את `ECX` באחד, ואז קופצת אם `ECX` אינו 0. קודם שימו ערך ב-`ECX`.

```shell
section .text
    MOV EAX, 0
    MOV ECX, 5
again:
    ADD EAX, ECX
    LOOP again       ; EAX = 5+4+3+2+1 = 15
    INT 1
```
<!-- console -memory cpu -->

<!-- warning -->
> אם `ECX` הוא 0 כשהלולאה מתחילה, הוא גולש ומתחיל מהסוף, והלולאה רצה כ-4 מיליארד פעמים. בדקו אותו קודם עם `CMP`.

## דילוג על לולאה ריקה

```shell
section .text
    MOV ECX, 0
    MOV EAX, 0
    CMP ECX, 0
    JE skip
again:
    INC EAX
    LOOP again
skip:
    INT 1            ; prints 0
```
<!-- console -memory cpu -->

## לולאות עם CMP

לתנאים אחרים בנו את הלולאה בעצמכם.

```shell
section .text
    MOV EAX, 1
again:
    ADD EAX, EAX     ; double it
    CMP EAX, 100
    JL again         ; until EAX >= 100
    INT 1            ; prints 128
```
<!-- console -memory cpu -->

<!-- notice -->
> `JCXZ` ו-`JECXZ` מופיעות ברשימת ההוראות, אבל האסמבלר כרגע לא מקבל אותן.

<strong>נסו בעצמכם:</strong> ספרו לאחור מ-10 עד 1 והדפיסו כל מספר.

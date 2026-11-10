# נתונים ותוויות

מגדירים נתונים ב-`section .data`. תווית נותנת לנתונים שם; שימוש בתווית כערך נותן את **הכתובת** שלהם, ושימוש ב-`[label]` נותן את **התוכן**.

```shell
section .data
    x: dd 42
    bytes: db 1, 2, 3, 4
    text: db 'Hello', 0
section .text
    MOV EAX, x       ; the address of x
    MOV EBX, [x]     ; the value 42
    MOV CL, byte [bytes] ; 1
```
<!-- -console memory cpu word:1 -->

- `db` לבתים, `dw` למילים, `dd` למילים כפולות. מחרוזות כותבים בין גרשיים.
- הנתונים ממוקמים בזיכרון לפי סדר ההגדרה, החל מכתובת 0.

## שינוי הזיכרון

```shell
section .data
    counter: dd 0
section .text
    MOV EAX, [counter]
    ADD EAX, 5
    MOV [counter], EAX
    ADD dword [counter], 1   ; operate directly on memory
```
<!-- -console memory cpu word:4 -->

השתמשו ב-`byte`, `word` או `dword` כשאין אוגר שקובע את הגודל.

## גודל הזיכרון ושגיאות

את גודל הזיכרון בוחרים בממשק. `ESP` ו-`EBP` מתחילים בראש הזיכרון. קריאה או כתיבה מחוץ לזיכרון עוצרת את התוכנית עם שגיאת זמן ריצה.

```shell
section .text
    MOV EAX, 100000
    MOV EBX, [EAX]   ; outside memory: runtime error
```
<!-- -console memory cpu -->

<strong>נסו בעצמכם:</strong> הגדילו את הזיכרון בממשק והריצו שוב.

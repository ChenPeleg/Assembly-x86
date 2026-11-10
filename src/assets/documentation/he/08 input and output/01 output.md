# קלט ופלט

האמולטור מתקשר עם הקונסולה באמצעות שתי פסיקות תוכנה.

| הוראה | מה היא עושה                                                        |
|-------------|-------------------------------------------------------------|
| `INT 1`     | מדפיסה את המספר שב-`EAX`                                  |
| `INT 2`     | מדפיסה את המחרוזת שהכתובת שלה נמצאת ב-`EAX`, עד בית `0` |

```shell
section .text
    MOV EAX, 2026
    INT 1
```
<!-- console -memory -cpu -->

## מחרוזות

```shell
section .data
    msg: db 'Hello', 0
    line: db 'Next line', 10, 0
section .text
    MOV EAX, msg
    INT 2
    MOV EAX, line
    INT 2
```
<!-- console memory -cpu word:1 ascii -->

- `0` מסיים את המחרוזת; בלעדיו ההדפסה ממשיכה הלאה בזיכרון.
- `10` הוא תו שורה חדשה.

## הדפסה של כמה מספרים

```shell
section .text
    MOV ECX, 5
again:
    MOV EAX, ECX
    INT 1
    LOOP again
```
<!-- console -memory cpu -->

<!-- notice -->
> **אין קלט**: אין מקלדת, קבצים או פסיקות אחרות. שימו את ערכי הבדיקה שלכם ב-`.data` או באוגרים.

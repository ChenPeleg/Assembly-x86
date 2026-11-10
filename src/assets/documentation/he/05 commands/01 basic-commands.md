# מבנה התוכנית

לתוכנית באמולטור יש שני אזורים.

## `section .data`

מגדיר נתונים מאותחלים עם `db` (בתים), `dw` (מילים) ו-`dd` (מילים כפולות). אפשר להגדיר מספרים, מחרוזות וכמה ערכים מופרדים בפסיקים. תווית נותנת שם לכתובת של הנתונים.

## `section .text`

מכיל את ההוראות. הביצוע מתחיל בהוראה הראשונה ונעצר ב-`HLT` או אחרי ההוראה האחרונה.

```shell
section .data
msg: db 'Hi!', 10, 0
section .text
    MOV EAX, msg   ; address of the string
    INT 2          ; print it
    HLT
```
<!-- console memory -cpu word:1 ascii -->

## הערות ותוויות

הערה מתחילה ב-`;`. תוויות מסתיימות ב-`:`. תווית שמתחילה ב-`.` היא מקומית לתווית שמעליה.

```shell
section .text
    MOV ECX, 3     ; counter
start:
    DEC ECX
    JNZ start      ; repeat
```
<!-- -console -memory cpu -->

<!-- notice -->
> ההבדלים מ-NASM: אין `global _start`, `section .bss`, `equ`, `times` או `resb`, ואין קריאות מערכת.
> תוכניות מסתיימות ב-`HLT` או כשנגמרות ההוראות.

הבא בתור: מדריך ההוראות, שמתחיל ב-*Data movement* (העברת נתונים).

# תחביר בסיסי - המבנה של תוכנית Assembly



<!-- new -->
> באתר ובמדריך הזה נשתמש באסמבלר NASM, אסמבלר פופולרי לארכיטקטורת x86. התחביר של NASM דומה לתחביר שפת ה-Assembly של Intel. הוא תוכנן להיות פשוט וקריא, כך שקל יותר לכתוב ולהבין קוד Assembly.

## אזורים (Sections)

ב-NASM תוכנית Assembly מחולקת לאזורים (sections), ולכל אחד מהם תפקיד מסוים. שני האזורים העיקריים הם:

- **.data**: אזור שבו מגדירים נתונים שהתוכנית משתמשת בהם, כמו משתנים, קבועים ומחרוזות.
- **.text**: אזור שמכיל את הקוד עצמו של התוכנית, כלומר את ההוראות שהמעבד יבצע.

יש אזור נוסף שמשתמשים בו לפעמים: .bss. האזור הזה משמש להגדרת נתונים לא מאותחלים (המדריך והאמולטור לא תומכים בו).


```shell
section .data
hello:
    db 'Stored data' ; the string 'Data from the Data section!' is stored in memory
section .text  ; the actual code of the program starts here:
    MOV EAX, hello
    INT 2

```
<!-- console -memory -cpu -->

## הערות

הערות משמשות לתיעוד הקוד ולהסבר מה הוא עושה. האסמבלר מתעלם מהן, והן לא משפיעות על ריצת התוכנית. ב-NASM הערה מתחילה בנקודה-פסיק `;` ונמשכת עד סוף השורה.

```shell
section .text ;  This is a comment
MOV EAX, 1 ; This is another comment
```
<!-- console -memory -cpu -->

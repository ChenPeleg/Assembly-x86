# תחביר Assembly בסיסי

בשפת Assembly לכל שורת קוד יש בדרך כלל מבנה קבוע. הצורה הכללית של שורה בשפת Assembly היא:

`[label]   mnemonic   [operands]   [;comment]`

- **label** (תווית): שדה אופציונלי שמסמן מקום בקוד. משמש כנקודת ייחוס לקפיצות וללולאות.
- **mnemonic** (מנמוניקה): קוד הפעולה שקובע איזו הוראה תתבצע.
- **operands** (אופרנדים): הנתונים או מקומות הזיכרון שמשתתפים בפעולה. השדה הזה אופציונלי ותלוי במנמוניקה.
- **comment** (הערה): שדה אופציונלי עם הסברים או הערות על הקוד. הערה מתחילה בנקודה-פסיק `;` ונמשכת עד סוף השורה.

## דוגמאות

נסתכל על כמה דוגמאות לשורות Assembly כדי להמחיש את התחביר והמבנה.

<!-- info -->
> שימו לב: ייתכן שחלק מהדוגמאות עדיין לא ברורות, אבל הן יוסברו בפירוט בפרקים הבאים.

### דוגמה 1: הוראת MOV פשוטה

```shell

section .text

start:  MOV EAX, 1  ; Move the value 1 into the EAX register

```

<!-- -console -memory cpu -->

- **label**: `start`
- **mnemonic**: `MOV`
- **operands**: `EAX, 1`

### דוגמה 2: הוראת ADD עם הערה

```shell

section .text

   ADD EAX, EBX  ; Add the value in EBX to EAX

```

<!-- -console -memory cpu -->

- **label**: (אין)
- **mnemonic**: `ADD`
- **operands**: `EAX, EBX`

### דוגמה 3: הוראת JMP עם תווית

```shell

section .text

   loop:
   mov EAX, 1
   JMP loop     ; Jump to the label 'loop'

```

<!-- -console -memory cpu -->

שימו לב שלהוראה `JMP` יש תווית כאופרנד. התווית קובעת לאן לקפוץ.

- **label**: `loop`
- **mnemonic**: `JMP`
- **operands**: `loop`

### דוגמה 4: הגדרת נתונים

```shell

section .data

    DB 'Hello, World!'  ; Declare a string

```

<!-- -console memory -cpu word:1 ascii -->

- **label**: `data`
- **mnemonic**: `DB`
- **operands**: `'Hello, World!'`

## דוגמה 5: פסיקת מערכת

```shell

section .text
    MOV EAX, 1
    INT 1

```

<!-- -console memory -cpu word:1 ascii -->
ההוראה `INT` יוצרת פסיקת תוכנה (software interrupt). בדוגמה הזו אנחנו משתמשים בפסיקה מספר 1 כדי להדפיס מספר שנמצא באוגר `EAX`.



<!-- notice -->
> במדריך ובאמולטור הזה נשתמש בהוראה **INT** כדי לקרוא לפסיקות מערכת. ההוראה **INT**
> יוצרת פסיקת תוכנה, שמעבירה את השליטה למטפל הפסיקות של מערכת ההפעלה. מספר הפסיקה
> ניתן כאופרנד להוראה **INT**, ומספרים שונים מתאימים לשירותי מערכת שונים.
> בדוגמה הזו אנחנו משתמשים בפסיקה 1 כדי להדפיס מספר, ובפסיקה 2 כדי להדפיס מחרוזת ששמורה באוגר **EAX**.


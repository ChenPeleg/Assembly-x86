# Hello world מתקדם

התוכנית הזו מדפיסה מחרוזת ואחר כך את העצרת של 5. הריצו אותה צעד אחר צעד ועקבו אחרי המחסנית בחלונית הזיכרון.

```shell
section .data
hello:
    db 'Hello world!', 10, 0
section .text
    MOV EAX, hello
    INT 2   ; print string EAX

    PUSH 5
    CALL factorial
    INT 1   ; print EAX
    HLT

factorial:
    ENTER

    CMP [EBP + 8], 1
    JNE .recurse
    MOV EAX, 1
    JMP .end

.recurse:
    MOV EAX, [EBP + 8]
    DEC EAX

    PUSH EAX
    CALL factorial

    IMUL [EBP + 8]

.end:
    LEAVE
    RET
```
<!-- console memory cpu -->

## איך זה עובד

1. **נתונים**: התווית `hello` מסמנת את הבתים `Hello world!`, תו שורה חדשה (`10`) ו-`0` מסיים.
2. **הדפסה**: `MOV EAX, hello` שם את כתובת המחרוזת ב-`EAX`; `INT 2` מדפיס עד ה-`0`.
3. **קריאה**: `PUSH 5` מעביר את הארגומנט דרך המחסנית, ו-`CALL` דוחף את כתובת החזרה וקופץ.
4. **מסגרת**: `ENTER` מכין את `EBP`, כך שהארגומנט נמצא ב-`[EBP + 8]`. `LEAVE` ו-`RET` מבטלים את זה.
5. **רקורסיה**: אם הארגומנט אינו 1, הפרוצדורה קוראת לעצמה עם `n - 1`, ואז מכפילה את התוצאה ב-`n`.
6. **תוצאה**: `EAX` מכיל `120`, שמודפס על ידי `INT 1`.

`.recurse` ו-`.end` הן תוויות מקומיות: הן שייכות לתווית הקרובה שמעליהן (`factorial`).
המחסנית והפרוצדורות מוסברות בפירוט בפרק *Stack & procedures*.

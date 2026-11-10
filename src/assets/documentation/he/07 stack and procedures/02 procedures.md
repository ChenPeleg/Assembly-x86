# פרוצדורות

`CALL label` דוחפת למחסנית את הכתובת של ההוראה הבאה וקופצת. `RET` שולפת את הכתובת הזו בחזרה אל `EIP`.

```shell
section .text
    MOV EAX, 1
    CALL double
    CALL double
    INT 1          ; prints 4
    HLT

double:
    ADD EAX, EAX
    RET
```
<!-- console memory cpu word:4 -->

תמיד סיימו את הקוד הראשי ב-`HLT`, אחרת הביצוע ימשיך לתוך הפרוצדורה.

## ארגומנטים ו-ENTER / LEAVE

מעבירים ארגומנטים בדחיפה שלהם למחסנית. `ENTER` שומרת את `EBP` ומכוונת אותו למסגרת החדשה; `LEAVE` מבטלת זאת.
אחרי `ENTER` הארגומנט נמצא ב-`[EBP + 8]`.

```shell
section .text
    PUSH 7
    CALL square
    ADD ESP, 4      ; remove the argument
    INT 1           ; prints 49
    HLT

square:
    ENTER
    MOV EAX, [EBP + 8]
    MOV EBX, EAX
    IMUL EBX        ; EAX = EAX * EBX
    LEAVE
    RET
```
<!-- console memory cpu word:4 -->

כשיש כמה ארגומנטים, האחרון שנדחף נמצא ב-`[EBP + 8]`, זה שלפניו ב-`[EBP + 12]`, וכן הלאה.

## רקורסיה

דוגמת העצרת בעמוד *Hello world advanced* קוראת לעצמה עם ארגומנט קטן יותר. הריצו אותה צעד אחר צעד וראו איך המחסנית גדלה בכל קריאה וקטנה בזמן החזרה.

<strong>נסו בעצמכם:</strong> כתבו פרוצדורה שמחברת שני ארגומנטים, `[EBP + 8]` ו-`[EBP + 12]`.

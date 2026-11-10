# המחסנית

המחסנית היא אזור בראש הזיכרון שמשמש לערכים זמניים. `ESP` מצביע על ראש המחסנית. היא גדלה **כלפי מטה**.

- `PUSH x`: `ESP = ESP - 4`, ואז שמירת `x` ב-`[ESP]`.
- `POP r`: טעינת `[ESP]` אל `r`, ואז `ESP = ESP + 4`.

```shell
section .text
    PUSH 10
    PUSH 20
    PUSH 30
    POP EAX      ; 30
    POP EBX      ; 20
    POP ECX      ; 10
```
<!-- -console memory cpu word:4 -->

עקבו אחרי `ESP`: הוא יורד ב-4 בכל דחיפה ועולה בכל שליפה.

## שמירת אוגרים

```shell
section .text
    MOV EAX, 5
    PUSH EAX      ; save
    MOV EAX, 99   ; use EAX for something else
    POP EAX       ; restore: 5
```
<!-- -console memory cpu word:4 -->

<!-- warning -->
> לכל `PUSH` צריך `POP` מתאים. מחסנית לא מאוזנת שוברת את `RET`.

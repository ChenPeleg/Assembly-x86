# גודלי נתונים

| שם                | גודל    | טווח ללא סימן  | הגדרה עם |
|---------------------|---------|-----------------|---------------|
| ביט (Bit)                 | ביט אחד | 0 - 1           |               |
| ניבל (Nibble)              | 4 ביטים  | 0 - 15          |               |
| בית (Byte)                | 8 ביטים  | 0 - 255         | `db`          |
| מילה (Word)                | 16 ביטים | 0 - 65,535      | `dw`          |
| מילה כפולה (DWORD) | 32 ביטים | 0 - 4,294,967,295 | `dd`        |

## הגדרת נתונים

```shell
section .data
    a: db 10
    b: dw 1000
    c: dd 100000
section .text
    MOV EAX, 0
    MOV AL, byte [a]      ; reads 1 byte
    MOV BX, word [b]      ; reads 2 bytes
    MOV ECX, [c]     ; reads 4 bytes
```
<!-- -console memory cpu word:1 -->

`byte [a]` קורא בית אחד, `word [b]` קורא 2 בתים, ו-`[c]` בלי ציון גודל (או עם `dword`) קורא 4 בתים.

## Little endian

מעבדי x86 שומרים את **הבית הפחות משמעותי ראשון**. המילה `0x1234` נשמרת כ-`34 12`.

```shell
section .data
    value: dd 0x11223344
section .text
    MOV AL, byte [value]   ; AL = 0x44, the first byte in memory
```
<!-- -console memory cpu word:1 hex -->

## ציון גודל (Size casts)

כשאי אפשר להסיק את הגודל מאוגר, מציינים אותו עם `byte`, `word` או `dword`.

```shell
section .data
    n: dd 0
section .text
    MOV byte [n], byte 255
    MOV word [n], word 65535
    MOV dword [n], 1
```
<!-- -console memory -cpu word:1 -->

<strong>נסו בעצמכם:</strong> שנו את תצוגת הזיכרון ל-2 או 4 בתים לתא, וראו איך אותם נתונים נקראים אחרת.

# Input and output

The emulator talks to the console with two software interrupts.

| Instruction | Does                                                        |
|-------------|-------------------------------------------------------------|
| `INT 1`     | prints the number in `EAX`                                  |
| `INT 2`     | prints the string whose address is in `EAX`, up to a `0` byte |

```shell
section .text
    MOV EAX, 2026
    INT 1
```
<!-- console -memory -cpu -->

## Strings

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

- `0` ends the string; without it, printing continues through memory.
- `10` is a newline.

## Printing several numbers

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
> There is **no input**: no keyboard, files or other interrupts. Put your test values in `.data` or in registers.

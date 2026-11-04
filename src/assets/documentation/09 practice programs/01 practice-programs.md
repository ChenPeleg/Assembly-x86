# Practice programs

Each program has a goal, a solution and the expected output. Try writing your own first, then compare.

## 1. Sum of 1..N

Goal: print the sum 1 + 2 + ... + 10. Expected output: `55`

```shell
section .text
    MOV EAX, 0
    MOV ECX, 10
add_next:
    ADD EAX, ECX
    LOOP add_next
    INT 1
```
<!-- console -memory cpu -->

## 2. Maximum of an array

Goal: print the largest number. Expected output: `9`

```shell
section .data
    nums: dd 3, 9, 2, 7, 5
section .text
    MOV EAX, [nums]
    MOV ESI, 1
    MOV ECX, 4
next:
    CMP EAX, [nums + ESI*4]
    JGE skip
    MOV EAX, [nums + ESI*4]
skip:
    INC ESI
    LOOP next
    INT 1
```
<!-- console memory cpu word:4 -->

## 3. String length

Goal: count the characters before the `0`. Expected output: `5`

```shell
section .data
    s: db 'hello', 0
section .text
    MOV EAX, 0
count:
    CMP byte [s + EAX*1], byte 0
    JE done
    INC EAX
    JMP count
done:
    INT 1
```
<!-- console memory cpu word:1 ascii -->

## 4. Fibonacci

Goal: print the first 10 Fibonacci numbers. Expected output: `1 1 2 3 5 8 13 21 34 55`

```shell
section .text
    MOV EBX, 0       ; previous
    MOV EDX, 1       ; current
    MOV ECX, 10
next:
    MOV EAX, EDX
    INT 1
    ADD EDX, EBX     ; next = current + previous
    MOV EBX, EAX     ; previous = old current
    LOOP next
```
<!-- console -memory cpu -->

## 5. Greatest common divisor

Goal: GCD of 48 and 18 with Euclid's algorithm. Expected output: `6`

```shell
section .text
    MOV EAX, 48
    MOV EBX, 18
gcd:
    CMP EBX, 0
    JE done
    MOV EDX, 0
    IDIV EBX         ; EDX = EAX mod EBX
    MOV EAX, EBX
    MOV EBX, EDX
    JMP gcd
done:
    INT 1
```
<!-- console -memory cpu -->

## 6. Reverse a string

Goal: reverse `abc` in place and print it. Expected output: `cba`

```shell
section .data
    s: db 'abc', 0
section .text
    MOV ESI, 0
    MOV EDI, 2
swap:
    MOV AL, byte [s + ESI*1]
    MOV BL, byte [s + EDI*1]
    MOV byte [s + ESI*1], BL
    MOV byte [s + EDI*1], AL
    INC ESI
    DEC EDI
    CMP ESI, EDI
    JL swap
    MOV EAX, s
    INT 2
```
<!-- console memory cpu word:1 ascii -->

# Representing numbers

The computer's memory stores data in binary form, using a series of 0s and 1s to represent numbers, characters, and
other information. Understanding how numbers are represented in binary is essential for working with assembly language
and computer systems.

The computer's memory is made up of cells, within which binary numbers are stored. Each binary digit (0 or 1) is called
a bit. This is a short form of the words binary digit. Now, let's assume a fundamental premise that we have a limit on
the number of bits we can use to represent a number. In computers, this is a very practical limitation because computers
store numbers in cells of fixed size. The common sizes are 8, 16, 32, or 64 bits. This means that the limit on the
number of bits for representing a number is a basic part of how computers operate. Let's assume we have a cell with N
bits. What is the largest number we can store in it? Let's look at the following table, which summarizes the largest
number that can be represented by a number of bits ranging from 1 to 8:

| Number of Bits (N) | Largest Number in Binary | Decimal Translation |
|--------------------|--------------------------|---------------------|
| 1                  | 1                        | 1                   |
| 2                  | 11                       | 3                   |
| 3                  | 111                      | 7                   |
| 4                  | 1111                     | 15                  |
| 5                  | 11111                    | 31                  |
| 6                  | 111111                   | 63                  |
| 7                  | 1111111                  | 127                 |
| 8                  | 11111111                 | 255                 |

The table shows that the largest number that can be represented by N bits is 2^N - 1. This is because each bit can have
one of two values (0 or 1), so the total number of unique combinations of N bits is 2^N. However, since we start
counting from 0, the largest number that can be represented is 2^N - 1.

### Overflow

When working with binary numbers, it's important to be aware of the concept of overflow. Overflow occurs when the result
of an arithmetic operation exceeds the maximum value that can be represented by the number of bits available. For
example, if you add two binary numbers and the result is larger than the largest number that can be represented by the
number of bits used, an overflow condition occurs. In this case, the result is truncated to fit within the available
range, and the overflow condition is flagged.


example:

```shell
section .text
mov EAX, 4294967295
add EAX, 1
```
<!--  -memory -console cpu word:4 binary -->

in  this example, the value of the `EAX` register is `4294967295`, which is the largest 32-bit unsigned integer. When we
add 1 to this value, the result exceeds the maximum value that can be represented by a 32-bit integer, causing an
overflow condition. The result is truncated to fit within the available range, resulting in the value `0`.


example:

```shell
section .text
mov [0], 4294967295
add [0], 1
```
<!-- -cpu memory -console word:4 binary -->

In this example, the value `4294967295` is stored in the memory location at address `0`. When we add `1` to this value,
an overflow condition occurs, and the result is truncated to fit within the available range. The memory location at
address `0` now contains the value `0`.

Notice that the next memory cell is not affected by the overflow, and it still contains the value `0`.

 
When the result of an arithmetic operation exceeds the maximum value that can be represented by the number of bits
available, an overflow condition occurs. This leads to setting the overflow flag in the CPU, OF (Overflow Flag).

**Run the previous example with the CPU view**

You will see that the overflow flag is set after the addition operation, indicating that an overflow condition has

We'll learn more about the overflow flag and how to handle overflow conditions in the upcoming sections.

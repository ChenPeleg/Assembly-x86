
# Binary Numbers in Action

The **binary system** is a numeral system that uses only two symbols, typically "0" and "1". It is widely used in digital technology and forms the foundation of computing systems. In the binary system, each digit, also known as a **bit**, represents a value of either 0 or 1. The value of a binary number depends on the position of its bits.


| Bit value | Position value as a power of base 2 | Bit number |
|-----------|-------------------------------------|------------|
| 1         | 128                                 | 7          |
| 1         | 64                                  | 6          |
| 1         | 32                                  | 5          |
| 1         | 16                                  | 4          |
| 1         | 8                                   | 3          |
| 1         | 4                                   | 2          |
| 1         | 2                                   | 1          |
| 1         | 1                                   | 0          |



## Example Code

Here is an example of assembly code that stores a binary number in memory and then retrieves it:

```shell

section .text
MOV [0], 5
MOV [4], 30
MOV [8], 150
```
<!--  memory -console -cpu word:4 binary -->

Run the code above.
You will see that the binary numbers 5, 30, and 150 are stored in the first three memory locations (each memory location represent 4 bytes).

now you'll see the binary representation of the numbers in the memory locations:

- 101
- 11110
- 10010110

Why is that?

The binary representation of the numbers are as follows:

The binary representation of the numbers are as follows:

- 5 = 101
  - 1\*2^2 + 0\*2^1 + 1\*2^0 = 4 + 0 + 1 = 5
- 30 = 11110
  - 1\*2^4 + 1\*2^3 + 1\*2^2 + 1\*2^1 + 0\*2^0 = 16 + 8 + 4 + 2 + 0 = 30
- 150 = 10010110
  - 1\*2^7 + 0\*2^6 + 0\*2^5 + 1\*2^4 + 0\*2^3 + 1\*2^2 + 1\*2^1 + 0\*2^0 = 128 + 0 + 0 + 16 + 0 + 4 + 2 + 0 = 150

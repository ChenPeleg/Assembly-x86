# Negative numbers 

In computer systems, negative numbers are typically represented using a method called two's complement. This method allows for efficient arithmetic operations and simplifies the design of the arithmetic logic unit (ALU) in the CPU.

## Two's Complement Representation

In two's complement, the most significant bit (MSB) is used as the sign bit. If the MSB is 0, the number is positive; if the MSB is 1, the number is negative. The value of a negative number in two's complement is obtained by inverting all the bits of its positive counterpart and then adding 1 to the least significant bit (LSB).

For example, let's consider an 8-bit system:

| Decimal | Binary  | Two's Complement |
|---------|---------|------------------|
| 0       | 00000000| 00000000         |
| 1       | 00000001| 00000001         |
| -1      | 00000001| 11111111         |
| 2       | 00000010| 00000010         |
| -2      | 00000010| 11111110         |
| 127     | 01111111| 01111111         |
| -128    | 10000000| 10000000         |

### Converting to Two's Complement

To convert a positive number to its negative counterpart in two's complement:
1. Invert all the bits (change 0s to 1s and 1s to 0s).
2. Add 1 to the resulting binary number.

Example: Converting +5 to -5 in an 8-bit system:
1. +5 in binary: `00000101`
2. Invert the bits: `11111010`
3. Add 1: `11111010 + 1 = 11111011`

So, -5 in two's complement is `11111011`.

### Arithmetic Operations

Arithmetic operations with two's complement numbers are straightforward. The same binary addition and subtraction rules apply, and the sign bit is automatically handled.

Example: Adding -3 and 2 in an 8-bit system:
1. -3 in binary (two's complement): `11111101`
2. 2 in binary: `00000010`
3. Add the numbers: `11111101 + 00000010 = 11111111`

The result `11111111` is -1 in two's complement.

### Overflow in Two's Complement

Overflow can also occur with two's complement numbers. It happens when the result of an arithmetic operation exceeds the range that can be represented with the given number of bits.

Example: Adding 127 and 1 in an 8-bit system:
1. 127 in binary: `01111111`
2. 1 in binary: `00000001`
3. Add the numbers: `01111111 + 00000001 = 10000000`

The result `10000000` is -128 in two's complement, indicating an overflow condition.

### Summary

Two's complement is a widely used method for representing negative numbers in binary systems. It simplifies arithmetic operations and is efficient for computer hardware. Understanding two's complement is essential for working with low-level programming and computer architecture.

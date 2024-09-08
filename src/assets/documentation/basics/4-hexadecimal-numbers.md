
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
MOV EAX, binaryNumber
```


## Binary System

The **binary system** is a numeral system that uses only two symbols, typically "0" and "1". It is widely used in digital technology and forms the foundation of computing systems. In the binary system, each digit, also known as a **bit**, represents a value of either 0 or 1. The value of a binary number depends on the position of its bits.

### Binary Digits

In the binary system, each digit is called a **binary digit** or **bit**. A bit can have one of two possible values: 0 or 1. These values correspond to the absence or presence of an electric signal in electronic systems.

### Place Value

The binary system follows a **place value** system, similar to the decimal system. However, instead of powers of 10, the binary system uses powers of 2. Each bit's position represents a power of 2, starting from the rightmost bit:

`... 2^4  2^3  2^2  2^1  2^0`

For example, in a 4-bit binary number, the rightmost bit represents 2^0 (1), the next bit represents 2^1 (2), the next bit represents 2^2 (4), and so on.

### Binary to Decimal Conversion

To convert a binary number to decimal, you multiply each bit by its corresponding place value and sum the results. For example, the binary number 1010 can be converted to decimal as follows:

`(1 * 2^3) + (0 * 2^2) + (1 * 2^1) + (0 * 2^0) = 8 + 0 + 2 + 0 = 10`

So, the binary number 1010 is equivalent to the decimal number 10.

### Applications

The binary system is fundamental in digital computing systems, where information is stored and processed using binary digits. It allows for efficient representation of data and enables the design of electronic circuits that manipulate and process binary information. Binary is used extensively in computer programming, communication systems, and other fields related to information technology.
The Markdown format allows for easy formatting and readability.


Let's take a look at this code:

```shell
section .text
MOV  [0], 5

```

The instruction `MOV [0], 1` stores value 5 into the memory location at address 0.
Run the code (with ▶️) and look at the value of the first memory cell.

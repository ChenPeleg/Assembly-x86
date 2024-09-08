# Hexadecimal Numbers

The **hexadecimal system** is a numeral system that uses 16 symbols to represent values. The symbols used in the hexadecimal system are the numbers 0-9 and the letters A-F. The hexadecimal system is widely used in computing systems because it provides a convenient way to represent binary numbers in a more compact and readable form.

## Hexadecimal Digits

In the hexadecimal system, each digit is called a **hexadecimal digit** or **hex digit**. A hex digit can have one of sixteen possible values: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, or F. These values correspond to the decimal values 0 through 15.

## Place Value

The hexadecimal system follows a **place value** system, similar to the decimal and binary systems. However, instead of powers of 10 or 2, the hexadecimal system uses powers of 16. Each hex digit's position represents a power of 16, starting from the rightmost digit:

`... 16^4  16^3  16^2  16^1  16^0`

For example, in a 4-digit hexadecimal number, the rightmost digit represents 16^0 (1), the next digit represents 16^1 (16), the next digit represents 16^2 (256), and so on.

## Hexadecimal to Decimal Conversion

To convert a hexadecimal number to decimal, you multiply each hex digit by its corresponding place value and sum the results. For example, the hexadecimal number 1A3 can be converted to decimal as follows:

`(1 * 16^2) + (A * 16^1) + (3 * 16^0) = 256 + 160 + 3 = 419`

So, the hexadecimal number 1A3 is equivalent to the decimal number 419.

## Applications

The hexadecimal system is fundamental in digital computing systems, where it is used to represent binary numbers in a more readable form. It allows for efficient representation of data and is commonly used in programming, memory addressing, and color codes in web design.

## Example Code

Here is an example of assembly code that stores a hexadecimal number in memory and then retrieves it:

```shell
section .text
MOV [0], 0x1A
MOV [4], 0x2F
MOV [8], 0x96
```
<!--  memory -console -cpu word:4 hex -->


## Writing Hexadecimal Numbers

In assembly language, hexadecimal numbers are typically written with a `0x` prefix to indicate that they are in hexadecimal format. For example, `0x1A` represents the hexadecimal number 1A.

When writing hexadecimal numbers, it is important to use the correct symbols (0-9, A-F) and ensure that the numbers are prefixed with `0x` to distinguish them from decimal or binary numbers.

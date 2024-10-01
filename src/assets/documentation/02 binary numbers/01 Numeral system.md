# Numeral systems

## Introduction - What are numeral systems?

## Decimal System 

The **decimal system**, also known as the base-10 numeral system, is the standard system for denoting integer and non-integer numbers. It is the most widely used numeral system and employs ten symbols: 0, 1, 2, 3, 4, 5, 6, 7, 8, and 9. Each digit's position in a decimal number represents a power of 10, starting from the rightmost digit.

### Why is the Decimal System So Intuitive to People?

The decimal system, or base-10 numeral system, is highly intuitive to people for several reasons:

1. **Historical and Cultural Prevalence**: The decimal system has been used for thousands of years across various cultures and civilizations. Its widespread historical use has ingrained it deeply into human society.

2. **Human Anatomy**: Humans have ten fingers, which naturally lends itself to counting in tens. This anatomical feature likely influenced the development and adoption of the decimal system.

3. **Educational Foundation**: From a young age, people are taught arithmetic using the decimal system. This early and consistent exposure makes it second nature for most individuals.

4. **Simplicity and Familiarity**: The decimal system is straightforward, using only ten symbols (0-9). Its simplicity and the familiarity of these symbols make it easy to understand and use.

5. **Ease of Arithmetic Operations**: Arithmetic operations such as addition, subtraction, multiplication, and division are relatively simple and intuitive in the decimal system. This ease of use reinforces its intuitiveness.

6. **Consistency in Place Value**: The place value system in decimal is consistent and logical, with each position representing a power of 10. This consistency helps people easily grasp and manipulate numbers.

7. **Universal Application**: The decimal system is used universally in everyday life, from commerce and finance to science and engineering. Its ubiquitous application makes it the default system for most people.

Overall, the combination of historical use, anatomical convenience, educational reinforcement, and practical simplicity makes the decimal system highly intuitive for people.


### Decimal Digits

In the decimal system, each digit is called a **decimal digit**. A decimal digit can have one of ten possible values: 0 through 9. These values are used to represent quantities in everyday life, such as counting, measuring, and performing arithmetic operations.

### Place Value

The decimal system follows a **place value** system, where the value of each digit is determined by its position. Each position represents a power of 10, starting from the rightmost digit:\
\
`... 10^4  10^3  10^2  10^1  10^0`\
\
For example, in the decimal number 1234, the rightmost digit represents 10^0 (1), the next digit represents 10^1 (10), the next digit represents 10^2 (100), and so on.

### Decimal to Binary Conversion

To convert a decimal number to binary, you repeatedly divide the number by 2 and record the remainder. The binary number is formed by the remainders read in reverse order. For example, to convert the decimal number 10 to binary:\
\
`10 / 2 = 5 remainder 0`\
`5 / 2 = 2 remainder 1`\
`2 / 2 = 1 remainder 0`\
`1 / 2 = 0 remainder 1`\
\
Reading the remainders in reverse order, the binary representation of the decimal number 10 is 1010.

### Applications

The decimal system is fundamental in everyday life and is used in various fields such as commerce, science, and engineering. It is the basis for most arithmetic operations and is used extensively in financial calculations, measurements, and data representation. The decimal system's simplicity and familiarity make it the preferred choice for most human-centric applications.

## Binary System

The binary system, also known as the base-2 numeral system, is a method of representing numbers that uses only two
digits: 0 and 1. Each digit in a binary number is referred to as a bit, which is short for binary digit. The binary
system is the foundation of all modern digital systems, including computers and other electronic devices. This is
because binary is a simple and efficient way to represent and process data using electrical signals, where 0 can
represent the absence of a signal and 1 can represent the presence of a signal. In the binary system, the value of each
bit is determined by its position, or place value, which is a power of 2. For example, the binary number 1101 represents
the decimal number 13, calculated as (1 * 2^3) + (1 * 2^2) + (0 * 2^1) + (1 * 2^0) = 8 + 4 + 0 + 1 = 13. Binary numbers
are used extensively in computer programming, data storage, and digital communications because they align well with the
binary logic used in digital circuits and processors.

## Hexadecimal System in depth

The **hexadecimal system**, also known as the base-16 numeral system, is a method of representing numbers that uses sixteen distinct symbols: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, and F. Each digit in a hexadecimal number represents a power of 16, starting from the rightmost digit.

### Hexadecimal Digits

In the hexadecimal system, each digit is called a **hexadecimal digit**. A hexadecimal digit can have one of sixteen possible values: 0 through 9 and A through F. The letters A through F represent the decimal values 10 through 15, respectively.

### Place Value

The hexadecimal system follows a **place value** system, where the value of each digit is determined by its position. Each position represents a power of 16, starting from the rightmost digit:\
\
`... 16^4  16^3  16^2  16^1  16^0`\
\
For example, in the hexadecimal number 1A3, the rightmost digit represents 16^0 (1), the next digit represents 16^1 (16), and the next digit represents 16^2 (256). The value of 1A3 in decimal is calculated as:\
\
`(1 * 16^2) + (A * 16^1) + (3 * 16^0) = 256 + 160 + 3 = 419`

### Hexadecimal to Binary Conversion

To convert a hexadecimal number to binary, you replace each hexadecimal digit with its 4-bit binary equivalent. For example, to convert the hexadecimal number 1A3 to binary:\
\
`1 = 0001`\
`A = 1010`\
`3 = 0011`\
\
So, the binary representation of the hexadecimal number 1A3 is 0001 1010 0011.

### Applications

The hexadecimal system is widely used in computing and digital electronics because it provides a more human-friendly representation of binary-coded values. It is particularly useful in programming, memory addressing, and debugging.

### Importance in Assembly Language

The hexadecimal system is crucial in assembly language programming for several reasons:

1. **Compact Representation**: Hexadecimal provides a more compact and readable representation of binary data. Since each hexadecimal digit represents four binary digits (bits), it significantly reduces the length of binary strings.

2. **Memory Addressing**: Memory addresses in computers are often represented in hexadecimal. This makes it easier for programmers to read and understand memory locations and offsets.

3. **Instruction Encoding**: Assembly language instructions and machine code are often represented in hexadecimal. This allows for easier interpretation and manipulation of low-level code.

4. **Debugging**: During debugging, hexadecimal values are used to display the contents of memory and registers. This helps programmers quickly identify and analyze data.

5. **Data Representation**: Hexadecimal is used to represent various data types, such as color codes in graphics programming and error codes in system diagnostics.

Overall, the hexadecimal system's efficiency and readability make it an essential tool in assembly language programming and low-level computing tasks.

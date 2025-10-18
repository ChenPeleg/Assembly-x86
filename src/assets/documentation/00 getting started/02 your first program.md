# Your First Program

Let's create your first assembly program step by step!

## The Simplest Program

Here's the absolute simplest program that does something:

```shell
section .text
    MOV AX, 42
    INT 3   ; print number in AX
```
<!-- console cpu --> 

**What it does:**
1. Moves the number 42 into register AX
2. Prints the value (you'll see 42 in the console)

Click "Try It" to run this program!

## Understanding the Structure

Assembly programs have two main sections:

### .data Section (Optional)
Where you define variables and constants:

```shell
section .data
myNumber:
    db 100      ; Define byte with value 100
myText:
    db 'Hi!'    ; Define text
```

### .text Section (Required)
Where your actual code goes:

```shell
section .text
    MOV AX, 10
    ; your instructions here
```

## A More Complete Example

Let's write a program that adds two numbers:

```shell
section .data
num1:
    db 15
num2:
    db 27

section .text
    MOV AL, [num1]     ; Load first number into AL
    MOV BL, [num2]     ; Load second number into BL
    ADD AL, BL         ; Add them: AL = AL + BL
    MOV AH, 0          ; Clear high byte of AX
    INT 3              ; Print the result
```
<!-- console cpu memory --> 

**Expected Output:** 42 (because 15 + 27 = 42)

## Step-by-Step Walkthrough

Let's break down what happens in the addition example:

1. **`MOV AL, [num1]`**
   - Reads the value from memory location `num1` (15)
   - Stores it in register AL
   - After: AL = 15

2. **`MOV BL, [num2]`**
   - Reads the value from memory location `num2` (27)
   - Stores it in register BL
   - After: BL = 27

3. **`ADD AL, BL`**
   - Adds BL to AL
   - Stores result back in AL
   - After: AL = 42

4. **`MOV AH, 0`**
   - Clears the high byte of AX register
   - This ensures AX = AL (needed for printing)

5. **`INT 3`**
   - Interrupt that prints the number in AX
   - Output: 42

## Printing Text vs Numbers

There are two types of output interrupts:

### Print a String (INT 2)
```shell
section .data
greeting:
    db 'Hello World!'

section .text
    MOV EAX, greeting
    INT 2              ; print string
```
<!-- console --> 

### Print a Number (INT 3)
```shell
section .text
    MOV AX, 123
    INT 3              ; print number
```
<!-- console cpu --> 

## Common Beginner Mistakes

### Mistake 1: Forgetting Square Brackets
```shell
MOV AL, num1      ; ❌ WRONG: This tries to use the address
MOV AL, [num1]    ; ✅ RIGHT: This loads the value at that address
```

### Mistake 2: Wrong Register Size
```shell
MOV AX, [num1]    ; ❌ WRONG if num1 is 1 byte (db)
MOV AL, [num1]    ; ✅ RIGHT: AL is 8-bit, matches db
```

### Mistake 3: Using Wrong Interrupt
```shell
section .data
msg: db 'Hi'
section .text
    MOV EAX, msg
    INT 3         ; ❌ WRONG: INT 3 is for numbers
    INT 2         ; ✅ RIGHT: INT 2 is for strings
```

## Practice Exercises

### Exercise 1: Subtraction
Modify the addition program to subtract instead of add:
```shell
section .data
num1: db 50
num2: db 20
section .text
    MOV AL, [num1]
    MOV BL, [num2]
    SUB AL, BL         ; Change this line!
    MOV AH, 0
    INT 3
```
<!-- console cpu memory --> 

**Expected Output:** 30

### Exercise 2: Multiple Operations
Calculate: (10 + 5) * 2

```shell
section .text
    MOV AL, 10
    ADD AL, 5          ; AL = 15
    MOV BL, 2
    MUL BL             ; AX = AL * BL = 30
    INT 3
```
<!-- console cpu --> 

**Expected Output:** 30

### Exercise 3: Print Your Name
Create a program that prints your name:

```shell
section .data
name:
    db 'Your Name Here'
section .text
    MOV EAX, name
    INT 2
```
<!-- console --> 

## Debugging Your First Program

If something doesn't work:

1. **Set Breakpoints**: Click line numbers to pause execution
2. **Use Step**: Execute one line at a time
3. **Watch Registers**: See if values are what you expect
4. **Check Memory**: Verify your data section has correct values
5. **Read Error Messages**: The console may show helpful hints

## Next Steps

You've learned:
- ✅ Basic program structure (.data and .text sections)
- ✅ How to move data between registers and memory
- ✅ How to perform simple arithmetic
- ✅ How to print output
- ✅ Common mistakes to avoid

**Continue learning:**
- Explore more instructions (MOV, ADD, SUB, MUL, DIV)
- Learn about different registers and their uses
- Understand memory addressing modes
- Master control flow (JMP, conditional jumps)

Ready for more? Check out the Basics section for deeper dives into each topic!

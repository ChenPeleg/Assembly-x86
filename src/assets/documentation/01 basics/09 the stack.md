# The Stack

The stack is a region of memory that is used to store data temporarily. The stack is a last-in, first-out (LIFO) data structure, which means that the last item added to the stack is the first item to be removed. The stack is used to store local variables, function parameters, return addresses, and other data.
When the operating system starts a program, it allocates a stack for the program to use. The stack is typically located at the top of the memory space and grows downward. The stack pointer (ESP) register points to the top of the stack, and the stack grows downward as items are pushed onto the stack.

<!-- warning -->
> In this page we'll use very simple examples to demonstrate how the stack and heap works. In real-world programs, the structure would be different and more complex.


![stack and heap memory](https://icarus.cs.weber.edu/~dab/cs1410/textbook/4.Pointers/images/layout.png)


## How the Stack Works

To demonstrate how the stack works, let's consider the following example:

```shell

section .text
    mov [0], 72 ; Store the value 72 (char H) at memory address 0
    mov [4] , 101 ; Store the value 101 (char e) at memory address 4
    mov [8] ,97 ; Store the value 87 (char a) at memory address 8
    mov [12] , 112 ; Store the value 108 (char p) at memory address 12
    push 107 ; Push the value 107 (char k) onto the stack
    push 99 ; Push the value 99 (char c) onto the stack
    push 97 ; Push the value 97 (char a) onto the stack
    push 116 ; Push the value 116 (char t) onto the stack
    push 83 ; Push the value 83 (char s) onto the stack
```
<!--  memory -console -cpu word:4 ascii -->


This is a very simple example that demonstrates how the stack works. In this example, we are storing the characters 'H', 'e', 'a', 'p', 'k', 'c', 'a', 't', and 's' in memory and then pushing them onto the stack. The stack grows downward as items are pushed onto it, and the stack pointer (ESP) is updated to point to the top of the stack.


## Pushing and Popping Items from the Stack
```shell

section .text

    push 99 ; Push the value 99 (char c) onto the stack
    pop EAX; pops the value from the stack
    push 98 ; Push the value 98 (char b) onto the stack
    pop EAX; pops the value from the stack
    push 99 ; Push the value 99 (char c) onto the stack

```

<!--  memory -console -cpu word:4 ascii -->

When an element is pushed to the stack, the stack the next time there will be a push it will be to the next memory address, and when an element is popped from the stack.

When an item is pushed onto the stack, the stack pointer is decremented to point to the next available location on the stack. When an item is popped from the stack, the stack pointer is incremented to point to the next item on the stack.

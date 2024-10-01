# Numeral systems Examples

| Decimal | Binary  | Hexadecimal |
|---------|---------|-------------|
| 0       | 0       | 0           |
| 1       | 1       | 1           |
| 2       | 10      | 2           |
| 3       | 11      | 3           |
| 4       | 100     | 4           |
| 5       | 101     | 5           |
| 6       | 110     | 6           |
| 7       | 111     | 7           |
| 8       | 1000    | 8           |
| 9       | 1001    | 9           |
| 10      | 1010    | A           |
| 11      | 1011    | B           |
| 12      | 1100    | C           |
| 13      | 1101    | D           |
| 14      | 1110    | E           |
| 15      | 1111    | F           |
| 16      | 10000   | 10          |
| 17      | 10001   | 11          |
| 18      | 10010   | 12          |
| 19      | 10011   | 13          |
| 20      | 10100   | 14          |


```shell

section .text

MOV [0], 1
MOV [4], 2
MOV [8], 3
MOV [12], 5
MOV [26], 6
MOV [20], 7
MOV [24], 8
MOV [28], 9
MOV [32], 10
MOV [36], 11
MOV [40], 12
MOV [44], 13
MOV [48], 14
MOV [52], 15
MOV [56], 16
MOV [60], 17
MOV [64], 18
 
```
<!--  memory -console -cpu word:4 binary -->

Run the code above. You will see that the binary numbers 1, 2, and 3 are stored in the first three memory locations (each memory location represents 4 bytes).
<!-- new -->
> you can change the view of the memory cells by pressing `Numbers` or `Hex` buttons  

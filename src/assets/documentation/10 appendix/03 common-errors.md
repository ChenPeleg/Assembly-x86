# Common errors

| Message / symptom                | Cause and fix                                                               |
|----------------------------------|-----------------------------------------------------------------------------|
| `Error at line N: ...`           | Syntax error or unsupported instruction. Check the spelling and the cheat sheet. |
| Division by zero                 | The divisor is 0. Check it before `IDIV`.                                      |
| Wrong `IDIV` result             | `EDX` was not cleared (0, or -1 for a negative `EAX`).                      |
| Memory access error              | The address is outside memory. Check the pointer or increase the memory size. |
| Program never ends               | A loop condition never becomes false, or `ECX` was 0 before `LOOP`.         |
| Runs into a procedure            | Missing `HLT` before the procedure code.                                    |
| `RET` jumps to a strange place   | Unbalanced `PUSH`/`POP`.                                                    |
| Prints extra characters          | The string has no terminating `0`.                                          |
| Wrong jump taken                 | Signed (`JL/JG`) vs unsigned (`JB/JA`) jump chosen incorrectly.             |
| `Wrong size of operands`         | A plain number is 32 bits. Use `MOV AL, byte 5`, `MOV AX, word 5`, `byte [x]`. |

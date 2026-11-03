# Logic and masks

| Instruction    | Each result bit is 1 when...         |
|----------------|--------------------------------------|
| `AND dst, src` | both bits are 1                      |
| `OR dst, src`  | at least one bit is 1                |
| `XOR dst, src` | the bits differ                      |

`AND`, `OR` and `XOR` set ZF, SF and PF, and clear CF and OF.

```shell
section .text
    MOV EAX, 12       ; 1100
    AND EAX, 10       ; 1010 -> 1000 = 8
    MOV EBX, 12
    OR  EBX, 10       ; 1110 = 14
    MOV ECX, 12
    XOR ECX, 10       ; 0110 = 6
```
<!-- -console -memory cpu -->

## Masks

- **Keep** some bits: `AND` with 1s where you want to keep.
- **Set** some bits: `OR` with 1s where you want to set.
- **Flip** some bits: `XOR` with 1s where you want to flip.

```shell
section .text
    MOV EAX, 0x12AB
    AND EAX, 0xFF     ; keep the low byte: 0xAB
    OR  EAX, 0x100    ; set bit 8: 0x1AB
    XOR EAX, 0xFF     ; flip the low byte: 0x154
```
<!-- -console -memory cpu -->

## Zeroing a register

`XOR EAX, EAX` sets `EAX` to 0 (and ZF to 1). A number is even when `AND EAX, 1` gives 0.

```shell
section .text
    MOV EAX, 77
    XOR EAX, EAX
```
<!-- -console -memory cpu -->

<!-- notice -->
> Numbers are written in decimal or hex (`0x2A`). `NOT`, `NEG`, `TEST` and the shift/rotate instructions (`SHL`, `SHR`,
> `SAR`, `ROL`, `ROR`) are not in the emulator. Multiply or divide by powers of two instead.

import { CPU } from "./cpu";
import { RuntimeException } from "./runtime-exception";

// TODO: reimplement the operations in bitwise manner
//arithmetic logic unit
export class ALU {
  constructor(private cpu: CPU) {}

  add(
    op1: number,
    op2: number,
    previousCarry: number = 0,
    subtract: boolean = false
  ): number {
    op1 = this.normalize(op1);
    op2 = this.normalize(op2);

    const originalOp1 = op1;
    const originalOp2 = op2;

    let result: number = 0;
    let carry: number[] = [0, previousCarry];

    for (let i = 0; i < 32; i++) {
      carry[0] = carry[1];
      let value: number = (op1 & 1) + (op2 & 1) + carry[0];
      op1 >>= 1;
      op2 >>= 1;

      result |= value % 2 << i;
      carry[1] = value / 2 >= 1 ? 1 : 0;
    }

    this.cpu.statusWord.carry =
      (!subtract && carry[1] === 1) || (subtract && originalOp1 < -originalOp2);
    this.cpu.statusWord.overflow = (carry[0] ^ carry[1]) === 1;
    this.cpu.setFlags(result);

    return this.normalize(result);
  }
  sub(op1: number, op2: number, previousCarry: number = 0): number {
    return this.add(op1, this.normalize(-op2), previousCarry, true);
  }

  idivide(
    dividend: number,
    divisor: number
  ): { value: number; remainder: number } {
    dividend = this.normalize(dividend);
    divisor = this.normalize(divisor);

    if (divisor === 0) {
      throw new RuntimeException("Division by zero");
    }

    return {
      value: this.normalize(dividend / divisor),
      remainder: this.normalize(dividend % divisor),
    };
  }
  imultiply(
    op1: number,
    op2: number
  ): { lowerHalf: number; upperHalf: number } {
    op1 = this.normalize(op1);
    op2 = this.normalize(op2);

    let result: number = op1 * op2;
    let lowerHalf: number = result & 0xffffffff;
    let upperHalf = result / Math.pow(2, 32);

    return {
      lowerHalf: this.normalize(lowerHalf),
      upperHalf: this.normalize(upperHalf),
    };
  }

  inc(value: number): number {
    value = this.normalize(value);
    const result = this.normalize(value + 1);
    /**
     * Todo: check that this is correct
     */
    this.cpu.setFlags(result);
    this.cpu.statusWord.overflow = false;
    this.cpu.statusWord.carry = false;
    /**
     * Todo: end
     */
    return result;
  }
  dec(value: number): number {
    value = this.normalize(value);
    const result = this.normalize(value - 1);
    /**
     * Todo: check that this is correct
     */
    this.cpu.setFlags(result);
    this.cpu.statusWord.overflow = false;
    this.cpu.statusWord.carry = false;
    /**
     * Todo: end
     */
    return result;
  }

  and(op1: number, op2: number): number {
    let result: number = op1 & op2;
    /**
     * Todo: check that this is correct
     */
    this.cpu.setFlags(result);
    this.cpu.statusWord.overflow = false;
    this.cpu.statusWord.carry = false;

    return result;
  }
  or(op1: number, op2: number): number {
    let result: number = op1 | op2;

    this.cpu.setFlags(result);
    this.cpu.statusWord.overflow = false;
    this.cpu.statusWord.carry = false;

    return result;
  }
  xor(op1: number, op2: number): number {
    let result: number = op1 ^ op2;

    this.cpu.setFlags(result);
    this.cpu.statusWord.overflow = false;
    this.cpu.statusWord.carry = false;

    return result;
  }

  extend64bit(lowerHalf: number, upperHalf: number): number {
    lowerHalf = this.normalize(lowerHalf);
    upperHalf = this.normalize(upperHalf);

    return this.normalize(upperHalf * Math.pow(2, 32) + lowerHalf);
  }

  private normalize(value: number): number {
    return value | 0;
  }
}

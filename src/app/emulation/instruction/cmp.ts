import {BinaryOperation} from "./instruction";
import {CPU} from "../cpu";
import {Parameter} from "./parameter";

export class Compare extends BinaryOperation
{
    execute(cpu: CPU): number
    {
        // @ts-ignore
      cpu.alu.sub(this.target.getValue(), this.source.getValue());
        return cpu.getNextInstruction();
    }

    getValidParameters(): string[][]
    {
        return [
            [Parameter.Reg, Parameter.Reg],
            [Parameter.Reg, Parameter.Memory],
            [Parameter.Memory, Parameter.Reg]
        ];
    }
}

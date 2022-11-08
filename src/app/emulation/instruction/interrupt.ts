import {UnaryReadOperation} from "./instruction";
import {CPU} from "../cpu";
import {MemoryView} from "../memory-view";

export class Interrupt extends UnaryReadOperation
{
    private number: MemoryView | undefined;

    execute(cpu: CPU): number
    {
        // @ts-ignore
      cpu.onInterrupt.emit(this.number.getValue());
        return cpu.getNextInstruction();
    }

  override loadParameters(number: MemoryView): void
    {
        this.number = number;
    }
}

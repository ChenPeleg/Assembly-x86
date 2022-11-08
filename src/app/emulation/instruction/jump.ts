import {UnaryReadOperation} from "./instruction";
import {CPU} from "../cpu";

export class Jump extends UnaryReadOperation
{
    override execute(cpu: CPU): number
    {
        return this.target.getValue();
    }

    protected jumpIf(cpu: CPU, condition: boolean): number
    {
        return condition ? this.target.getValue() : cpu.eip + 1;
    }
}
//@ts-nocheck
export class Loop extends Jump
{

  override execute(cpu: CPU): number
    {
        cpu.getRegisterByName("ECX").setValue(cpu.getRegisterByName("ECX").getValue() - 1);

        return this.jumpIf(cpu, cpu.getRegisterByName("ECX").getValue() !== 0);
    }
}
export class LoopE extends Jump
{
  override execute(cpu: CPU): number
    {
        cpu.getRegisterByName("ECX").setValue(cpu.getRegisterByName("ECX").getValue() - 1);

        return this.jumpIf(cpu, cpu.getRegisterByName("ECX").getValue() !== 0 && cpu.statusWord.zero);
    }
}
export class LoopNE extends Jump
{
  override execute(cpu: CPU): number
    {
        cpu.getRegisterByName("ECX").setValue(cpu.getRegisterByName("ECX").getValue() - 1);

        return this.jumpIf(cpu, cpu.getRegisterByName("ECX").getValue() !== 0 && !cpu.statusWord.zero);
    }
}

export class JumpO extends Jump
{
  override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, cpu.conditionUnit.overflow);
    }
}
export class JumpNO extends Jump
{
  override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, !cpu.conditionUnit.overflow);
    }
}

export class JumpS extends Jump
{
  override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, cpu.conditionUnit.sign);
    }
}
export class JumpNS extends Jump
{
  override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, !cpu.conditionUnit.sign);
    }
}

export class JumpE extends Jump
{
  override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, cpu.conditionUnit.equal);
    }
}
export class JumpNE extends Jump
{
  override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, !cpu.conditionUnit.equal);
    }
}

export class JumpB extends Jump
{
  override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, cpu.conditionUnit.below);
    }
}
export class JumpAE extends Jump
{
  override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, !cpu.conditionUnit.below);
    }
}

export class JumpA extends Jump
{
  override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, cpu.conditionUnit.above);
    }
}
export class JumpBE extends Jump
{
  override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, !cpu.conditionUnit.above);
    }
}

export class JumpL extends Jump
{
  override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, cpu.conditionUnit.less);
    }
}
export class JumpGE extends Jump
{
    override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, !cpu.conditionUnit.less);
    }
}

export class JumpLE extends Jump
{
    override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, !cpu.conditionUnit.greater);
    }
}
export class JumpG extends Jump
{
    override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, cpu.conditionUnit.greater);
    }
}

export class JumpP extends Jump
{
    override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, cpu.conditionUnit.parity);
    }
}
export class JumpNP extends Jump
{
    override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, !cpu.conditionUnit.parity);
    }
}

export class JumpCXZ extends Jump
{
    override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, cpu.getRegisterByName("CX").getValue() === 0);
    }
}
export class JumpECXZ extends Jump
{
    override execute(cpu: CPU): number
    {
        return this.jumpIf(cpu, cpu.getRegisterByName("ECX").getValue() === 0);
    }
}

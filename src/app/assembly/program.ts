import { LodashUtils } from "../util/lodash-utils";
import {Instruction} from "../emulation/instruction/instruction";
import {CPU} from "../emulation/cpu";
import {EncodedInstruction} from "./encoding";
import {MemoryDefinition} from "./assembler";

export class LineMap
{
    private mapping: any = {};

    public mapLine(address: number, line: number)
    {
        this.mapping[address] = line;
    }
    public getLineByAddress(address: number): number
    {
        return LodashUtils.findLast(this.mapping, (_line: number, key: string) => Number(key) <= address) as number;
    }
    public getAddressByLine(row: number): number
    {
        return Number(LodashUtils.findKey(this.mapping, (line: number) => line === row));
    }
}

export class Program
{
    constructor(private _instructions: EncodedInstruction[],
                private _memoryDefinitions: MemoryDefinition[],
                private _lineMap: LineMap)
    {

    }

    get instructions(): EncodedInstruction[]
    {
        return this._instructions;
    }
    get memoryDefinitions(): MemoryDefinition[]
    {
        return this._memoryDefinitions;
    }
    public get lineMap(): LineMap
    {
        return this._lineMap;
    }

    public getInstructionByAddress(cpu: CPU, address: number): Instruction
    {
        return this.instructions[address].instantiate(cpu);
    }
}

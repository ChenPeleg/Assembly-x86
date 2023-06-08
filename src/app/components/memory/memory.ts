import { Component, Input } from "@angular/core";
import { MemoryBlock } from "../../emulation/memory-block";
import * as _ from "lodash";
import { MemoryValueType } from "../../models/MemoryDisplay";

@Component({
  selector: "memory",
  templateUrl: "./memory.html",
  styleUrls: ["./memory.scss"],
})
export class MemoryComponent {
  // @ts-ignore
  @Input() memory: MemoryBlock | undefined = null;
  @Input() wordSize: number = 1;
  @Input() width: number = 10;

  private _ascii: boolean = false;

  get ascii(): boolean {
    return this._ascii;
  }

  @Input() set ascii(value: boolean) {
    this._ascii = value;
  }

  private _valueType: MemoryValueType = "number";

  get valueType(): MemoryValueType {
    return this._valueType;
  }

  @Input() set valueType(value: MemoryValueType) {
    this._valueType = value;
  }

  public getRowCount(): number {
    // @ts-ignore
    return Math.ceil(this.memory.size / this.width / this.wordSize);
  }
  public createRange(count: number): number[] {
    return _.range(count);
  }
  public createAddress(row: number, col: number): number {
    return row * this.width * this.wordSize + col * this.wordSize;
  }
  public getCellValue(address: number): string {
    let value: number =
      this.memory?.load(address, this.wordSize).getValue() || 0;

    if (this._ascii) {
      return String.fromCharCode(value);
    } else {
      return value.toString();
    }
  }
}

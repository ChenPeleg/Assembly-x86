import { Component, Input } from "@angular/core";
import { MemoryBlock } from "../../emulation/memory-block";
import * as _ from "lodash";
import { MemoryDisplay, MemoryValueType } from "../../models/MemoryDisplay";
import { Store } from "@ngrx/store";

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

  constructor(
    private store: Store<{
      memoryDisplay: MemoryDisplay;
    }>
  ) {
    store.select("memoryDisplay").subscribe((m) => {
      this._valueType = m.valueType;
      this.wordSize = m.wordSize;
    });
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
    switch (this._valueType) {
      case "ascii":
        return String.fromCharCode(value);
      case "number":
        return value.toString();
      case "hex":
        return value.toString(16).toUpperCase();
      case "binary":
        return value.toString(2);
    }
  }
}

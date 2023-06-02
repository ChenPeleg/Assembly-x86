import { Component, Input } from "@angular/core";
import { MemoryBlock } from "../../emulation/memory-block";
import * as _ from "lodash";

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

  private _ascii: boolean = true;

  get ascii(): boolean {
    return this._ascii;
  }

  @Input() set ascii(value: boolean) {
    if (value) {
      this.wordSize = 1;
    }

    this._ascii = value;
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
    // @ts-ignore
    let value: number = this.memory.load(address, this.wordSize).getValue();

    if (this._ascii) {
      return String.fromCharCode(value);
    } else {
      return value.toString();
    }
  }
}

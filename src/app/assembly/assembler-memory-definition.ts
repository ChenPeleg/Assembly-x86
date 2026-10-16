export class MemoryDefinition {
  constructor(
    private _address: number,
    private _size: number,
    private _value: any
  ) {}

  get address(): number {
    return this._address;
  }
  get size(): number {
    return this._size;
  }
  get value(): any {
    return this._value;
  }
}

export type MemoryValueType = "number" | "ascii" | "binary" | "hex";

export interface MemoryDisplay {
  wordSize: 1 | 2 | 4;
  valueType: MemoryValueType;
}

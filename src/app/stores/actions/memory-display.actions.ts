import { createAction, props } from "@ngrx/store";
import { MemoryDisplay } from "../../models/MemoryDisplay";

export const MemoryDisplayActions = {
  setWordSize: createAction(
    "[Display Memory] Set word size",
    props<{ wordSize: 1 | 2 | 4 }>()
  ),
  setValueType: createAction(
    "[Display Memory] Set value type",
    props<{ valueType: "number" | "ascii" | "binary" | "hex" }>()
  ),
  updateMemoryDisplay: createAction(
    "[Display Memory] Set memory display",
    props<MemoryDisplay>()
  ),
};

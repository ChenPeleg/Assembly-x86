import { createReducer, on } from "@ngrx/store";
import { MemoryDisplay } from "../../models/MemoryDisplay";
import { MemoryDisplayActions } from "../actions/memory-display.actions";

export const MemoryDisplayInitialState: MemoryDisplay = {
  wordSize: 1,
  valueType: "number",
};

export const MemoryDisplayReducer = createReducer(
  MemoryDisplayInitialState,
  on(MemoryDisplayActions.setWordSize, (state, { wordSize }) => {
    return {
      ...state,
      wordSize: wordSize || state.wordSize,
    };
  }),
  on(MemoryDisplayActions.setValueType, (state, { valueType }) => {
    return {
      ...state,
      valueType: valueType || state.valueType,
    };
  }),
  on(MemoryDisplayActions.updateMemoryDisplay, (state, newState) => {
    return {
      ...newState,
    };
  })
);

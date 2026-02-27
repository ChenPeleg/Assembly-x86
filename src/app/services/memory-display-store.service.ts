import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MemoryDisplay } from "../models/MemoryDisplay";

export const MemoryDisplayInitialState: MemoryDisplay = {
  wordSize: 1,
  valueType: "number",
};

@Injectable({ providedIn: "root" })
export class MemoryDisplayStoreService {
  private readonly _state$ = new BehaviorSubject<MemoryDisplay>(
    structuredClone(MemoryDisplayInitialState)
  );
  public readonly state$ = this._state$.asObservable();

  setWordSize(wordSize: 1 | 2 | 4): void {
    const state = this._state$.getValue();
    this._state$.next({ ...state, wordSize: wordSize || state.wordSize });
  }

  setValueType(valueType: MemoryDisplay["valueType"]): void {
    const state = this._state$.getValue();
    this._state$.next({ ...state, valueType: valueType || state.valueType });
  }

  updateMemoryDisplay(newState: MemoryDisplay): void {
    this._state$.next({ ...newState });
  }
}

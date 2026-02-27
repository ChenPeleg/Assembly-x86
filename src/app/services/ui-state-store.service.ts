import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Panel, UIState } from "../models/UIState";

export const UIStateInitialState: UIState = {
  panels: [
    { isVisible: true, name: "console", order: 1 },
    { isVisible: true, name: "cpu", order: 2 },
    { isVisible: true, name: "memory", order: 3 },
  ],
  theme: "default",
};

@Injectable({ providedIn: "root" })
export class UiStateStoreService {
  private readonly _state$ = new BehaviorSubject<UIState>(
    structuredClone(UIStateInitialState)
  );
  public readonly state$ = this._state$.asObservable();

  reorder(panels: Panel[]): void {
    this._state$.next({ ...this._state$.getValue(), panels });
  }

  changeVisibility(panel: Panel): void {
    const state = this._state$.getValue();
    this._state$.next({
      ...state,
      panels: state.panels.map((p) => (p.name === panel.name ? panel : p)),
    });
  }

  resetToDefault(): void {
    this._state$.next(structuredClone(UIStateInitialState));
  }

  updateUIState(newState: UIState): void {
    this._state$.next({
      ...newState,
      panels: newState.panels.map((p) => ({ ...p })),
    });
  }
}

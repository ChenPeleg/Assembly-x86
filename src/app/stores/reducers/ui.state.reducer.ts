import { createReducer, on } from "@ngrx/store";
import { UIState } from "../../models/UIState";
import { UIStateActions } from "../actions/ui.state.actions";

export const UIStateInitialState: UIState = {
  panels: [
    { isVisible: true, name: "console", order: 1 },
    { isVisible: true, name: "cpu", order: 2 },
    { isVisible: true, name: "memory", order: 3 },
  ],
  theme: "default",
};

export const UIStateReducer = createReducer(
  UIStateInitialState,
  on(UIStateActions.reorder, (state, { panels }) => ({
    ...state,
    panels,
  })),
  on(UIStateActions.changeVisibility, (state, panel) => ({
    ...state,
    // @ts-ignore
    panels: state.panels.map((p) => (p.name === panel.name ? panel : p)),
  }))
);

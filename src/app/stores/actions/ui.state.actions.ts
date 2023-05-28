import { createAction, props } from "@ngrx/store";
import { Panel, UIState } from "../../models/UIState";

export const reorder = createAction("[UI Component] Reorder", props<UIState>());
export const changeVisibility = createAction(
  "[UI Component] Change Visibility",
  props<Panel>()
);
export const resetToDefault = createAction("[UI Component] reset To Default");

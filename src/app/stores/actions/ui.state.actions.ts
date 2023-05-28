import { createAction, props } from "@ngrx/store";
import { Panel, UIState } from "../../models/UIState";

export const UIStateActions = {
  reorder: createAction("[UI Component] Reorder", props<UIState>()),
  changeVisibility: createAction(
    "[UI Component] Change Visibility",
    props<Panel>()
  ),
  resetToDefault: createAction("[UI Component] reset To Default"),
};

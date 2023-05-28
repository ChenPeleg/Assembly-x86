import { Component } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Observable } from "rxjs";
import { Panel, UIState } from "../../models/UIState";
import { Store } from "@ngrx/store";
import { UIStateActions } from "../../stores/actions/ui.state.actions";

@Component({
  selector: "display-cockpit",
  templateUrl: "display-cockpit.component.html",
  styleUrls: ["display-cockpit.component.scss"],
})
export class DisplayCockpitComponent {
  count$: Observable<number>;

  timePeriods = [
    "Bronze age",
    "Iron age",
    "Middle ages",
    "Early modern period",
    "Long nineteenth century",
  ];
  uiState$: Observable<UIState>;
  constructor(private store: Store<{ count: number; uiState: UIState }>) {
    this.count$ = store.select("count");
    this.uiState$ = store.select("uiState");
    this.uiState$.subscribe((ui) => ui);
  }

  dropPanel(event: CdkDragDrop<string[]>, currentPanels: Panel[]) {
    let newPanelArray = currentPanels.map((p, i) => ({ ...p, order: i + 1 }));
    moveItemInArray(newPanelArray, event.previousIndex, event.currentIndex);
    newPanelArray = newPanelArray.map((p, i) => ({ ...p, order: i + 1 }));
    this.store.dispatch(UIStateActions.reorder({ panels: newPanelArray }));
  }
  clickVisibility($event: MouseEvent, panel: Panel) {
    const newPanel = { ...panel, isVisible: !panel.isVisible };
    this.store.dispatch(UIStateActions.changeVisibility(newPanel));
  }
}

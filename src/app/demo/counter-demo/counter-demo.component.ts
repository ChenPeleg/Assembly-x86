import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  decrement,
  increment,
  reset,
} from "../../stores/actions/counter.actions";
import { Panel, UIState } from "../../models/UIState";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { UIStateActions } from "../../stores/actions/ui.state.actions";

@Component({
  selector: "app-counter-demo",
  templateUrl: "./counter-demo.component.html",
  styleUrls: ["./counter-demo.component.scss"],
})
//https://ngrx.io/guide/store
export class CounterDemoComponent {
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
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }
  dropPanel(event: CdkDragDrop<string[]>, currentPanels: Panel[]) {
    let newPanelArray = currentPanels.map((p, i) => ({ ...p, order: i + 1 }));
    moveItemInArray(newPanelArray, event.previousIndex, event.currentIndex);
    newPanelArray = newPanelArray.map((p, i) => ({ ...p, order: i + 1 }));
    this.store.dispatch(UIStateActions.reorder({ panels: newPanelArray }));
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}

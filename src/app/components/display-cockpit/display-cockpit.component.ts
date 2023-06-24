import { Component } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Observable } from "rxjs";
import { Panel, UIState } from "../../models/UIState";
import { Store } from "@ngrx/store";
import { UIStateActions } from "../../stores/actions/ui.state.actions";
import { observableToPromise } from "../../util/obeservableToPromise";

@Component({
  selector: "display-cockpit",
  templateUrl: "display-cockpit.component.html",
  styleUrls: ["display-cockpit.component.scss"],
})
export class DisplayCockpitComponent {
  static readonly lsKey = "assemblyUIState";
  uiState$: Observable<UIState>;
  constructor(private store: Store<{ count: number; uiState: UIState }>) {
    this.uiState$ = store.select("uiState");
    this.uiState$.subscribe((ui) => ui);
    const lsData = window.localStorage.getItem(DisplayCockpitComponent.lsKey);
    if (lsData) {
      const uiState: UIState = JSON.parse(lsData) as UIState;
      this.store.dispatch(UIStateActions.updateUIState({ ...uiState }));
    }
  }

  dropPanel(event: CdkDragDrop<string[]>, currentPanels: Panel[]) {
    let newPanelArray = currentPanels.map((p, i) => ({ ...p, order: i + 1 }));
    moveItemInArray(newPanelArray, event.previousIndex, event.currentIndex);
    newPanelArray = newPanelArray.map((p, i) => ({ ...p, order: i + 1 }));
    this.store.dispatch(UIStateActions.reorder({ panels: newPanelArray }));
    this.updateLocalStorage().then();
  }
  clickVisibility($event: MouseEvent, panel: Panel) {
    const newPanel = { ...panel, isVisible: !panel.isVisible };
    this.store.dispatch(UIStateActions.changeVisibility(newPanel));
    this.updateLocalStorage().then();
  }
  private async updateLocalStorage() {
    const uiState = await observableToPromise(this.uiState$);
    window.localStorage.setItem(
      DisplayCockpitComponent.lsKey,
      JSON.stringify(uiState)
    );
  }
}

import { Component } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Observable } from "rxjs";
import { Panel, UIState } from "../../models/UIState";
import { UiStateStoreService } from "../../services/ui-state-store.service";
import { observableToPromise } from "../../util/obeservableToPromise";

@Component({
  selector: "display-cockpit",
  templateUrl: "display-cockpit.component.html",
  styleUrls: ["display-cockpit.component.scss"],
})
export class DisplayCockpitComponent {
  static readonly lsKey = "assemblyUIState";
  uiState$: Observable<UIState>;
  constructor(private uiStateStore: UiStateStoreService) {
    this.uiState$ = uiStateStore.state$;
    const lsData = window.localStorage.getItem(DisplayCockpitComponent.lsKey);
    if (lsData) {
      const uiState: UIState = JSON.parse(lsData) as UIState;
      this.uiStateStore.updateUIState({ ...uiState });
    }
  }

  dropPanel(event: CdkDragDrop<string[]>, currentPanels: Panel[]) {
    let newPanelArray = currentPanels.map((p, i) => ({ ...p, order: i + 1 }));
    moveItemInArray(newPanelArray, event.previousIndex, event.currentIndex);
    newPanelArray = newPanelArray.map((p, i) => ({ ...p, order: i + 1 }));
    this.uiStateStore.reorder(newPanelArray);
    this.updateLocalStorage().then();
  }
  clickVisibility($event: MouseEvent, panel: Panel) {
    const newPanel = { ...panel, isVisible: !panel.isVisible };
    this.uiStateStore.changeVisibility(newPanel);
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

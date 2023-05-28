import { Component } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

/**
 * @title Drag&Drop horizontal sorting
 */
@Component({
  selector: "display-cockpit",
  templateUrl: "display-cockpit.component.html",
  styleUrls: ["display-cockpit.component.scss"],
})
export class DisplayCockpitComponent {
  // uiPanels: Panel[];
  timePeriods = [
    "Bronze age",
    "Iron age",
    "Middle ages",
    "Early modern period",
    "Long nineteenth century",
  ];
  constructor() {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }
}

import { Component } from "@angular/core";
import { NgFor } from "@angular/common";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from "@angular/cdk/drag-drop";

/**
 * @title Drag&Drop horizontal sorting
 */
@Component({
  selector: "display-cockpit",
  templateUrl: "display-cockpit.component.html",
  styleUrls: ["display-cockpit.component.scss"],
  standalone: true,
  imports: [CdkDropList, NgFor, CdkDrag],
})
export class CdkDragDropHorizontalSortingExample {
  timePeriods = [
    "Bronze age",
    "Iron age",
    "Middle ages",
    "Early modern period",
    "Long nineteenth century",
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }
}

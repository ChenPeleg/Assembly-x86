import { Component, ViewEncapsulation } from "@angular/core";
import { MatChipListboxChange } from "@angular/material/chips";
import { MemoryDisplay } from "../../models/MemoryDisplay";
import { Observable } from "rxjs";
import { observableToPromise } from "../../util/obeservableToPromise";
import { MemoryDisplayStoreService } from "../../services/memory-display-store.service";

@Component({
  selector: "memory-options",
  templateUrl: "./memory-options.component.html",
  styleUrls: ["./memory-options.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MemoryOptionsComponent {
  static readonly lsKey = "assemblyMemoryDisplay";
  public readonly memoryDisplay$: Observable<MemoryDisplay>;

  constructor(private memoryDisplayStore: MemoryDisplayStoreService) {
    this.memoryDisplay$ = memoryDisplayStore.state$;
    const lsData = window.localStorage.getItem(MemoryOptionsComponent.lsKey);
    if (lsData) {
      const memoryDisplay: MemoryDisplay = JSON.parse(lsData) as MemoryDisplay;
      this.memoryDisplayStore.updateMemoryDisplay({ ...memoryDisplay });
    }
  }

  wordSizeSelected($event: MatChipListboxChange, current: number) {
    if (!$event.value) {
      $event.source.value = current;
      return;
    }
    this.memoryDisplayStore.setWordSize($event.value);
    this.updateLocalStorage().then();
  }

  valueTypeChanged($event: MatChipListboxChange, current: string) {
    if (!$event.value) {
      $event.source.value = current;
      return;
    }
    this.memoryDisplayStore.setValueType($event.value);
    this.updateLocalStorage().then();
  }

  private async updateLocalStorage() {
    const uiState = await observableToPromise(this.memoryDisplay$);
    window.localStorage.setItem(
      MemoryOptionsComponent.lsKey,
      JSON.stringify(uiState)
    );
  }
}

import { Component, ViewEncapsulation } from "@angular/core";
import { MatChipListboxChange } from "@angular/material/chips";
import { Store } from "@ngrx/store";
import { MemoryDisplay } from "../../models/MemoryDisplay";
import { Observable } from "rxjs";
import { MemoryDisplayActions } from "../../stores/actions/memory-display.actions";
import { observableToPromise } from "../../util/obeservableToPromise";

@Component({
  selector: "memory-options",
  templateUrl: "./memory-options.component.html",
  styleUrls: ["./memory-options.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MemoryOptionsComponent {
  static readonly lsKey = "assemblyMemoryDisplay";
  public readonly memoryDisplay$: Observable<MemoryDisplay>;

  constructor(
    private store: Store<{
      memoryDisplay: MemoryDisplay;
    }>
  ) {
    this.memoryDisplay$ = store.select("memoryDisplay");
    this.memoryDisplay$.subscribe((md) => md);
    const lsData = window.localStorage.getItem(MemoryOptionsComponent.lsKey);
    if (lsData) {
      const memoryDisplay: MemoryDisplay = JSON.parse(lsData) as MemoryDisplay;
      this.store.dispatch(
        MemoryDisplayActions.updateMemoryDisplay({ ...memoryDisplay })
      );
    }
  }

  wordSizeSelected($event: MatChipListboxChange, current: number) {
    if (!$event.value) {
      $event.source.value = current;
      return;
    }
    this.store.dispatch(
      MemoryDisplayActions.setWordSize({ wordSize: $event.value })
    );
    this.updateLocalStorage().then();
  }

  valueTypeChanged($event: MatChipListboxChange, current: string) {
    if (!$event.value) {
      $event.source.value = current;
      return;
    }
    this.store.dispatch(
      MemoryDisplayActions.setValueType({ valueType: $event.value })
    );
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

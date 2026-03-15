import { Component, ViewEncapsulation } from "@angular/core";
import { MemoryDisplay } from "../../models/MemoryDisplay";
import { Observable } from "rxjs";
import { observableToPromise } from "../../util/obeservableToPromise";
import { MemoryDisplayStoreService } from "../../services/memory-display-store.service";

@Component({
    selector: "memory-options",
    templateUrl: "./memory-options.component.html",
    styleUrls: ["./memory-options.component.css"],
    encapsulation: ViewEncapsulation.None,
    standalone: false
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

  wordSizeSelected(value: number, current: number) {
    if (!value) {
      return;
    }
    this.memoryDisplayStore.setWordSize(value as 1 | 2 | 4);
    this.updateLocalStorage().then();
  }

  valueTypeChanged(value: string, current: string) {
    if (!value) {
      return;
    }
    this.memoryDisplayStore.setValueType(value as MemoryDisplay["valueType"]);
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

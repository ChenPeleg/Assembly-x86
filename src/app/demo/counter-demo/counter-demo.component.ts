import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { decrement, increment, reset } from "../../store/counter.actions";

@Component({
  selector: "app-counter-demo",
  templateUrl: "./counter-demo.component.html",
  styleUrls: ["./counter-demo.component.scss"],
})
export class CounterDemoComponent {
  count$: Observable<number>;
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select("count");
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

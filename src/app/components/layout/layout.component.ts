import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  Data,
  NavigationEnd,
  Router,
  UrlSegment,
} from "@angular/router";
import {
  distinctUntilChanged,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from "rxjs";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject<void>();
  public readonly urlPath: Observable<any | null> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    takeUntil(this.destroy$)
  );
  constructor(private router: Router) {}
  ngOnDestroy(): void {
    this.destroy$.complete();
  }
  ngOnInit() {
    this.urlPath.subscribe((e) => console.log(e));
  }
}

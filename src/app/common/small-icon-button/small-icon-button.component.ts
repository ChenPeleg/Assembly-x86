import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-small-icon-button",
  templateUrl: "./small-icon-button.component.html",
  styleUrls: ["./small-icon-button.component.scss"],
})
export class SmallIconButtonComponent {
  @Output("clickEvent") clickEvent: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();
  @Input("iconName") public iconName: string = "visibility";
  @Input() disabled: boolean = false;

  emitClick($event: MouseEvent) {
    this.clickEvent.emit($event);
  }
}

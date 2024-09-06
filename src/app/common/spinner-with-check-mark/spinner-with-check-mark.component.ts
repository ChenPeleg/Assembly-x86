import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "spinner-with-check-mark",
  templateUrl: "./spinner-with-check-mark.component.html",
  styleUrls: ["./spinner-with-check-mark.component.scss"],
})
export class SpinnerWithCheckMarkComponent implements OnInit {
  public styleObj: any = {};
  @Input("status")
  public status: "pending" | "success" | "error" = "pending";

  @Input("Scale") set ScaleInPx(value: number) {
    const percent = value;
    let borderTop = 4;
    let borderRight = 3;
    if (value < 30) {
      borderTop = 3;
      borderRight = 2;
    }

    this.styleObj = {
      // transform: this.isCheck ? `scale(${1})` : `scale(0.2) rotate(45deg)`,
      height: `${value}px`,
      width: `${value}px`,
      "border-top-width": `${borderTop}px`,
      "border-right-width": `${borderRight}px`,
    };
  }

  public ngOnInit() {
    setTimeout(() => {
      this.status = "success";
    }, 2000);
  }
}

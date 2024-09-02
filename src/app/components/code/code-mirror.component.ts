import { Component } from "@angular/core";

@Component({
  selector: "code-mirror-component",
  templateUrl: "./code-mirror.component.html",
})
export class CodeMirrorComponent {
  public value: string = "";

  public print(value: string) {
    this.value += value;
  }

  clear() {
    this.value = "";
  }
}

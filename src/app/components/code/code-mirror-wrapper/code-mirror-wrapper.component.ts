import { Component } from "@angular/core";

@Component({
  selector: "code-mirror-component",
  templateUrl: "./code-mirror-wrapper.component.html",
})
export class CodeMirrorWrapperComponent {
  public value: string = "";

  public print(value: string) {
    this.value += value;
  }

  clear() {
    this.value = "";
  }
}

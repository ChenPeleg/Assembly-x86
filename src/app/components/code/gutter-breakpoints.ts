import { GutterMarker } from "@codemirror/view";

export class BreakMarker extends GutterMarker {
  private readonly show: boolean;
  constructor(show: boolean) {
    super();
    this.show = show;
  }

  override(other: GutterMarker): boolean {
    return false;
  }

  override toDOM() {
    const el = document.createElement("span");
    el.setAttribute("class", this.show ? "active" : "");
    el.innerText = this.show ? "⬤" : " ";
    return el;
  }
}

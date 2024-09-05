import { GutterMarker } from "@codemirror/view";
import { foldGutter } from "@codemirror/language";
import { Extension } from "@codemirror/state";

class CustomFoldMarker extends GutterMarker {
  constructor(private isFolded: boolean) {
    super();
  }
  override toDOM() {
    const el = document.createElement("span");
    el.className = "cm-foldMarker";
    el.innerText = this.isFolded ? "▼" : "▲"; // Customize the icons here
    return el;
  }
}

export function customFoldGutter(): Extension {
  return foldGutter({
    markerDOM: (isFolded) => new CustomFoldMarker(isFolded).toDOM(),
    openText: "▼", // Customize the open icon here
    closedText: "▲", // Customize the closed icon here
  });
}

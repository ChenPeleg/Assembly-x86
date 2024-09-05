import { GutterMarker } from "@codemirror/view";
import { foldGutter } from "@codemirror/language";
import { Extension } from "@codemirror/state";

class CustomFoldMarker extends GutterMarker {
  override elementClass = "cm-customFoldMarker";

  constructor(private isFolded: boolean) {
    super();
    this.elementClass = isFolded ? "cm-folded" : "cm-unfolded";
  }

  override toDOM() {
    const el = document.createElement("span");
    el.className = "cm-customFoldMarker";
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

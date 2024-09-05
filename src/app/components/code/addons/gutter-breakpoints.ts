import { EditorView, gutter, GutterMarker, ViewUpdate } from "@codemirror/view";
import { Extension } from "@codemirror/state";

class BreakMarker extends GutterMarker {
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
export function BuildBreakPointGutterExtension(breakPointRef: {
  [key: number]: boolean;
}): Extension {
  const breakpoints = breakPointRef;
  return gutter({
    class: "asm-breakpoints",
    renderEmptyElements: true,

    domEventHandlers: {
      click: (view: EditorView, line: any, event: Event): boolean => {
        const lineNumber = view.state.doc.lineAt(line.from).number;
        // console.log("lineNumber", lineNumber);
        breakpoints[lineNumber] = !breakpoints[lineNumber];
        const changes = { from: line.from, to: line.to };

        const changespec = { from: line.from, to: line.to };
        // @ts-ignore
        const updated = view.state.update([{ changes: changespec }]);
        view.dispatch(updated);

        return true;
      },
    },
    lineMarkerChange: (update: ViewUpdate): boolean => {
      // console.log(update);
      // const num = view.state.doc.lineAt(line.from).number;
      // breakpoints[num] = !breakpoints[num];
      return true;
    },
    lineMarker(view, line) {
      const num = view.state.doc.lineAt(line.from).number;
      return new BreakMarker(breakpoints[num]);
    },
  });
}

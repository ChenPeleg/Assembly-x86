import { EditorView, gutter, ViewUpdate } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { BreakMarker } from "./gutter-breakpoints-custom-marker";

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

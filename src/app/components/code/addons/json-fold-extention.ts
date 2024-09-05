import { Extension } from "@codemirror/state";
import { codeFolding, foldGutter } from "@codemirror/language";

export function jsonFold(): Extension {
  function jsonCodeFolding(): Extension {
    return codeFolding({
      // preparePlaceholder: (state, range) => {
      //   const text = state.sliceDoc(range.from - 1, range.to + 1);
      //   return JSON.stringify(JSON.parse(text)).slice(1, -1);
      // },
      // placeholderDOM: (_view, onclick, prepared) => {
      //   let element = document.createElement("span");
      //   element.textContent = prepared;
      //   element.setAttribute("aria-label", "folded code");
      //   element.title = "unfold";
      //   // element.className = "cm-foldPlaceholder"
      //   element.onclick = onclick;
      //   return element;
      // },
    });
  }

  const foldGutterExtension = foldGutter() as Extension[];
  foldGutterExtension.pop();
  foldGutterExtension.push(jsonCodeFolding());
  return foldGutterExtension;
}

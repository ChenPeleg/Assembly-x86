import { EditorView } from "@codemirror/view";

export const customCMTheme = EditorView.baseTheme({
  ".cm-o-replacement": {
    display: "inline-block",
    width: ".5em",
    height: ".5em",
    borderRadius: ".25em",
  },
  "&light .cm-o-replacement": {
    backgroundColor: "#04c",
  },
  "&dark .cm-o-replacement": {
    backgroundColor: "#5bf",
  },
});

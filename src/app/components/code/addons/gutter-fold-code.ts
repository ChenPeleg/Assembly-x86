import { basicSetup, EditorView } from "codemirror";
import { foldEffect, foldService } from "@codemirror/language";
import { EditorState } from "@codemirror/state";

export const getFoldingRangesByIndent = (
  state: EditorState,
  from: any,
  to: any
) => {
  const line = state.doc.lineAt(from); // First line
  const lines = state.doc.lines; // Number of lines in the document
  const indent = line.text.search(/\S|$/); // Indent level of the first line
  let foldStart = from; // Start of the fold
  let foldEnd = to; // End of the fold

  // Check the next line if it is on a deeper indent level
  // If it is, check the next line and so on
  // If it is not, go on with the foldEnd
  let nextLine = line;
  while (nextLine.number < lines) {
    nextLine = state.doc.line(nextLine.number + 1); // Next line
    const nextIndent = nextLine.text.search(/\S|$/); // Indent level of the next line

    // If the next line is on a deeper indent level, add it to the fold
    if (nextIndent > indent) {
      foldEnd = nextLine.to; // Set the fold end to the end of the next line
    } else {
      break; // If the next line is not on a deeper indent level, stop
    }
  }

  // If the fold is only one line, don't fold it
  if (state.doc.lineAt(foldStart).number === state.doc.lineAt(foldEnd).number) {
    return null;
  }

  // Set the fold start to the end of the first line
  // With this, the fold will not include the first line
  foldStart = line.to;

  // Return a fold that covers the entire indent level
  return { from: foldStart, to: foldEnd };
};

function foldOnIndentLvl(view: EditorView, indentLevel: number) {
  const state = view.state;
  const doc = state.doc;
  const foldingRanges = [];

  // Loop through all lines of the editor doc
  const numberOfLines = doc.lines;
  for (let line = 1; line < numberOfLines; line++) {
    const lineStart = doc.line(line).from; // Startposition der Zeile
    const lineEnd = doc.line(line).to; // Endposition der Zeile

    // Get folding range of line
    const foldingRange = getFoldingRangesByIndent(state, lineStart, lineEnd);

    // If folding range found, add it to the array
    if (foldingRange) {
      foldingRanges.push(foldingRange);
    }
  }

  // Loop through all folding ranges
  for (const foldingRange of foldingRanges) {
    const line = doc.lineAt(foldingRange.from); // Get line from folding start position
    const lineIntendation = line.text.match(/^\s*/)?.[0].length; // Get intendation of line

    // If line has no intendation or intendation is smaller than the indent level, continue (don't fold)
    if (!lineIntendation || lineIntendation !== indentLevel) {
      continue;
    }

    // Fold the given range
    view.dispatch({
      effects: foldEffect.of({ from: foldingRange.from, to: foldingRange.to }),
    });
  }
}

const view = new EditorView({
  doc: "a\nb\nc\nFold 1\n    abc\n    Fold 2\n        def\n        ghijklFold 1\n    abc\n    Fold 2\n        def\n        ghijklFold 1\n    abc\n    Fold 2\n        def\n        ghijkl",
  extensions: [basicSetup, foldService.of(getFoldingRangesByIndent)],
  parent: document.body,
});

foldOnIndentLvl(view, 4);

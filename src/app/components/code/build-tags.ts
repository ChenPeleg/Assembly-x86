import { Extension, RangeSetBuilder } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";

export interface CodeMirrorTag {
  /**
   * @description Names of the tags seperated by a dot
   */
  name: string;
  regex: RegExp;
  order: number;
  caseSensitive: boolean;
}

export function addMultipleTags(tags: CodeMirrorTag[]): Extension {
  // Sort tags by order
  tags.sort((a, b) => a.order - b.order);

  return ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;

      constructor(view: EditorView) {
        this.decorations = this.buildDecorations(view);
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged) {
          this.decorations = this.buildDecorations(update.view);
        }
      }

      buildDecorations(view: EditorView): DecorationSet {
        let builder = new RangeSetBuilder<Decoration>();
        for (let { from, to } of view.visibleRanges) {
          let text = view.state.doc.sliceString(from, to);
          let tagPositions = this.findTagPositions(text);
          for (let pos of tagPositions) {
            builder.add(
              from + pos.start,
              from + pos.end,
              Decoration.mark({ class: pos.class })
            );
          }
        }
        return builder.finish();
      }

      findTagPositions(
        text: string
      ): { start: number; end: number; class: string }[] {
        let positions: {
          start: number;
          end: number;
          class: string;
        }[] = [];
        for (let tag of tags) {
          let match;
          const allMatches = [...text.matchAll(new RegExp(tag.regex, "g"))];
          console.log(allMatches);
          allMatches.forEach((match) => {
            if (!match || match.index === undefined) {
              return;
            }
            positions.push({
              start: match.index,
              end: match.index + match[0].length,
              class: `${tag.name}`,
            });
          });
        }
        return positions;
      }
    },
    {
      decorations: (v) => v.decorations,
    }
  );
}

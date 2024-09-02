import { Extension, RangeSetBuilder } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";

export interface CodeMirrorTag {
  name: string;
  regex: RegExp;
  order: number;
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
        let positions = [];
        for (let tag of tags) {
          let match;
          while ((match = tag.regex.exec(text)) !== null) {
            positions.push({
              start: match.index,
              end: match.index + match[0].length,
              class: `${tag.name}-tag`,
            });
          }
        }
        return positions;
      }
      //
      // token(stream: any, state: any): string | null {
      //   console.log("stream", stream);
      //   if (state.tokenize) {
      //     return state.tokenize(stream, state);
      //   }
      //
      //   if (stream.eatSpace()) {
      //     return null;
      //   }
      //
      //   let style: string | null = null;
      //   let cur: string;
      //   let ch = stream.next();
      //
      //   if (ch === "/") {
      //     if (stream.eat("*")) {
      //       state.tokenize = this.clikeComment;
      //       return this.clikeComment(stream, state);
      //     }
      //   }
      //
      //   if (ch === "#") {
      //     stream.skipToEnd();
      //     return "comment";
      //   }
      //
      //   if (ch === '"') {
      //     this.nextUntilUnescaped(stream, '"');
      //     return "string";
      //   }
      //
      //   if (ch === ".") {
      //     stream.eatWhile(/\w/);
      //     cur = stream.current().toLowerCase();
      //     style = "builtin"; // Assuming directives are built-in
      //     return style || null;
      //   }
      //
      //   if (ch === "=") {
      //     stream.eatWhile(/\w/);
      //     return "tag";
      //   }
      //
      //   if (ch === "{" || ch === "}") {
      //     return "bracket";
      //   }
      //
      //   if (/\d/.test(ch)) {
      //     if (ch === "0" && stream.eat("x")) {
      //       stream.eatWhile(/[0-9a-fA-F]/);
      //       return "number";
      //     }
      //     stream.eatWhile(/\d/);
      //     return "number";
      //   }
      //
      //   if (/\w/.test(ch)) {
      //     stream.eatWhile(/\w/);
      //     if (stream.eat(":")) {
      //       return "tag";
      //     }
      //     cur = stream.current().toLowerCase();
      //     style = "variable"; // Assuming registers are variables
      //     return style || null;
      //   }
      //
      //   return null;
      // }

      nextUntilUnescaped(stream: any, end: string): boolean {
        let escaped = false,
          next;
        while ((next = stream.next()) != null) {
          if (next === end && !escaped) {
            return false;
          }
          escaped = !escaped && next === "\\";
        }
        return escaped;
      }

      clikeComment(stream: any, state: any): string {
        let maybeEnd = false,
          ch;
        while ((ch = stream.next()) != null) {
          if (ch === "/" && maybeEnd) {
            state.tokenize = null;
            break;
          }
          maybeEnd = ch === "*";
        }
        return "comment";
      }
    },
    {
      decorations: (v) => v.decorations,
    }
  );
}

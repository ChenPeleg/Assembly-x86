import { findMdTables } from "../findMdTables";

import { mdTableToHtml } from "../mdTableToHtmlTable";
import { findMdCodeBlocks, mdCodeBlockToHtml } from "../findMdCodeBlocks";

const codeBlockExample = "```shell" + "\n" + "cp 123 123\n```";
const codeBlockExample2 =
  "```shell\n" +
  "section.text\n" +
  "global _start\n" +
  "_start:\n" +
  "\n" +
  "```";
describe("Find md code blocks", () => {
  it("expect to find simple code block", () => {
    const result = findMdCodeBlocks(codeBlockExample);
    if (!result) {
      throw "no results";
    }

    expect(result[0]).toBe(codeBlockExample);
  });
  it("converts to find simple code block", () => {
    const result = mdCodeBlockToHtml(codeBlockExample);
    if (!result) {
      throw "no results";
    }
    expect(result).toBe(`<pre><code>cp 123 123\n</code></pre>`);
  });
  it("converts to find simple code block 2", () => {
    const result = mdCodeBlockToHtml(codeBlockExample2);
    if (!result) {
      throw "no results";
    }
    expect(result).toBe(`<pre><code>section.text
global _start
_start:

</code></pre>`);
  });
});

import { findMdTables } from "../findMdTables";

import { mdTableToHtml } from "../mdTableToHtmlTable";
import { findMdCodeBlocks, mdCodeBlockToHtml } from "../findMdCodeBlocks";

const codeBlockExample = "```shell\ncp 123 123\n```";
describe("Find md code blocks", () => {
  it("expect to find simple code block", () => {
    const result = findMdCodeBlocks(codeBlockExample);
    if (!result) {
      throw "no results";
    }
    console.log(result);
    expect(result[0]).toBe(codeBlockExample);
  });
  it("converts to find simple code block", () => {
    const result = mdCodeBlockToHtml(codeBlockExample);
    if (!result) {
      throw "no results";
    }

    expect(result).toBe(`<code>
cp 123 123</code>`);
  });
});
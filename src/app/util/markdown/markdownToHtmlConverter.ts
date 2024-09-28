import { findMdTables } from "./findMdTables";
import { mdTableToHtml } from "./mdTableToHtmlTable";
import { findMdCodeBlocks, mdCodeBlockToHtml } from "./findMdCodeBlocks";

export class MarkdownToHtmlConverter {
  public readonly html: string;

  constructor(markdown: string) {
    this.html = this.convertHtmlToMarkdown(markdown);
  }

  static convertTablesToHtml(markdown: string): string {
    const allTables = findMdTables(markdown);
    allTables?.forEach((t) => {
      const tableInHtml = mdTableToHtml(t);
      markdown = markdown.replace(t, tableInHtml.outerHTML);
    });
    return markdown;
  }
  static convertListsToHtml(mdText: string): string {
    mdText = mdText.replace(/^\s*-\s*(.*)$/gim, "\n<li>$1</li>");
    mdText = mdText.replace(/^\s*\*\s*(.*)$/gim, "\n<li>$1</li>");
    mdText = mdText.replace(
      /^\s*\d\.\s*(.*)$/gim,
      "\n<ol>\n<li>$1</li>\n</ol>"
    );

    mdText = mdText.replace(/<\/li>\n<ul>/gim, "<ul>");
    mdText = mdText.replace(/<\/li>\n<ol>/gim, "<ol>");
    mdText = mdText.replace(/<\/ol>\n<\/li>/gim, "</ol>");
    mdText = mdText.replace(/<\/ul>\n<\/li>/gim, "</ul>");
    return mdText;
  }
  static convertHeadingsToHtml(markdown: string): string {
    markdown = markdown.replace(/^# (.*)$/gm, "<h1>$1</h1>");
    markdown = markdown.replace(/^## (.*)$/gm, "<h2>$1</h2>");
    markdown = markdown.replace(/^### (.*)$/gm, "<h3>$1</h3>");
    return markdown;
  }
  static convertBoldAndItalicToHtml(markdown: string): string {
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    markdown = markdown.replace(/\*(.*?)\*/g, "<em>$1</em>");
    return markdown;
  }
  static convertImagesToHtml(markdown: string): string {
    markdown = markdown.replace(
      /\!\[(.*?)\]\((.*?)\)/gim,
      "<img alt='$1' src='$2' />"
    );
    return markdown;
  }
  private convertHtmlToMarkdown(markdown: string): string {
    return markdownToHtmlConverter(this.html);
  }
}

export const markdownToHtmlConverter = (markdown: string): string => {
  let mdText = markdown.replace(/\r\n/g, "\n");

  const allTables = findMdTables(mdText);

  allTables?.forEach((t) => {
    const tableInHtml = mdTableToHtml(t);
    mdText = mdText.replace(t, tableInHtml.outerHTML);
  });

  const allCode = findMdCodeBlocks(mdText);

  allCode?.forEach((c) => {
    const codeHtml = mdCodeBlockToHtml(c);
    mdText = mdText.replace(c, codeHtml);
  });

  // line breaks as two spaces at the end of the line
  //mdText = mdText.replace(/ {2}\n/gm, "</br>\n");
  //mdText = mdText.replace(/\n\n/gm, "</br>\n");

  markdown = mdText;

  // Convert headers (h1, h2, h3)
  markdown = markdown.replace(/^# (.*)$/gm, "<h1>$1</h1>");
  markdown = markdown.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  markdown = markdown.replace(/^### (.*)$/gm, "<h3>$1</h3>");

  // Convert bold and italic text
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  markdown = markdown.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Images
  markdown = markdown.replace(
    /\!\[(.*?)\]\((.*?)\)/gim,
    "<img alt='$1' src='$2' />"
  );
  // Convert links
  markdown = markdown.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>'
  );

  // Blockquotes
  markdown = markdown.replace(/^\>(.*)$/gim, "<blockquote>$1</blockquote>");
  markdown = markdown.replace(
    /<!-- ([^>]*) -->\n?<blockquote>/gs,
    `<blockquote class="$1">`
  );
  // Inline code
  markdown = markdown.replace(
    /\`(.*?)\`/gim,
    `<code class="inline-code">$1</code>`
  );

  // Paragraphs
  // markdown = markdown.replace(/\n$/gim, "<br />");
  markdown = markdown.replace(
    /(?:\r?\n){2,}([\s\S]*?)(?=(?:\r?\n){2,}|$)/gim,
    `<p class="paragraph">$1</p>`
  );
  //comments to span with tags

  markdown = markdown.replace(
    /^<!--(.*)-->$/gm,
    `<span data-comments="$1"></span>`
  );

  markdown = markdown.replace(/\\\n/gm, `<br>\n`);
  return markdown;
};

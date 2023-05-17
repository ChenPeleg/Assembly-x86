import { findMdTables } from "./findMdTables";
import { mdTableToHtml } from "./mdTableToHtmlTable";

export const markdownToHTML = (markdown: string): string => {
  let mdText = markdown.replace(/\r\n/g, "\n");
  const table = `  # Bit talbes md

| Bit value | Position value as a power of base 2 | Bit number |
|-----------|-------------------------------------|------------|
| 1         | 128                                 | 7          |
| 1         | 64                                  | 6          |
| 1         | 32                                  | 5          |
| 1         | 16                                  | 4          |
| 1         | 8                                   | 3          |
| 1         | 4                                   | 2          |
| 1         | 2                                   | 1          |
| 1         | 1                                   | 0          |
`;
  const allTables = findMdTables(mdText);
  const char = mdText.charCodeAt(81);
  const n = 2;
  console.log(
    markdown.charCodeAt(81),
    markdown[80 + n],
    markdown[81 + n],
    markdown[82 + n]
  );
  console.log(
    table.charCodeAt(81 + n),
    table[80 + n],
    table[81 + n],
    table[82 + n]
  );

  allTables?.forEach((t) => {
    const tableInHtml = mdTableToHtml(t);
    mdText = mdText.replace(t, tableInHtml.outerHTML);
  });

  mdText = mdText.replace(/^\s*-\s*(.*)$/gim, "\n<li>$1</li>");
  mdText = mdText.replace(/^\s*\*\s*(.*)$/gim, "\n<li>$1</li>");
  mdText = mdText.replace(/^\s*\d\.\s*(.*)$/gim, "\n<ol>\n<li>$1</li>\n</ol>");

  mdText = mdText.replace(/<\/li>\n<ul>/gim, "<ul>");
  mdText = mdText.replace(/<\/li>\n<ol>/gim, "<ol>");
  mdText = mdText.replace(/<\/ol>\n<\/li>/gim, "</ol>");
  mdText = mdText.replace(/<\/ul>\n<\/li>/gim, "</ul>");

  markdown = mdText;
  // Convert headers (h1, h2, h3)
  markdown = markdown.replace(/^# (.*)$/gm, "<h1>$1</h1>");
  markdown = markdown.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  markdown = markdown.replace(/^### (.*)$/gm, "<h3>$1</h3>");

  // Convert bold and italic text
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  markdown = markdown.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Convert links
  markdown = markdown.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>'
  );

  // Convert code blocks
  markdown = markdown.replace(
    /```([\s\S]*?)```/g,
    "<pre><code>$1</code></pre>"
  );

  // Images
  markdown = markdown.replace(
    /\!\[(.*?)\]\((.*?)\)/gim,
    "<img alt='$1' src='$2' />"
  );

  // Blockquotes
  markdown = markdown.replace(/^\>(.*)$/gim, "<blockquote>$1</blockquote>");

  // Inline code
  markdown = markdown.replace(/\`(.*)\`/gim, "<code>$1</code>");

  // Paragraphs
  // markdown = markdown.replace(/\n$/gim, "<br />");
  // markdown = markdown.replace(/\n/gim, "<p>$1</p>");

  return markdown;
};

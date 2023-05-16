export const markdownToHTML = (markdown: string): string => {
  let mdText = markdown;

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

function mdToHtmlTable(mdTable: string) {
  // Split the Markdown table into rows.
  const rows = mdTable.split("\n");

  // Create a list of HTML table rows.
  const htmlRows = [];
  for (const row of rows) {
    const htmlRow = [];
    const cells = row.split("|");
    for (const cell of cells) {
      htmlRow.push(cell);
    }
    htmlRows.push(htmlRow);
  }

  // Create the HTML table.
  let htmlTable: string = `<table>`;
  for (const row of htmlRows) {
    htmlTable += `<tr>`;
    for (const cell of row) {
      htmlTable += `<td>${cell}</td>`;
    }
    htmlTable += `</tr>`;
  }
  htmlTable += `</table>`;

  return htmlTable;
}

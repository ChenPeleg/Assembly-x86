export const markdownToHTML = (markdown: string): string => {
  // Convert unordered lists
  // markdown = markdown.replace(/^\* (.*)$/gm, "<li>$1</li>");
  // markdown = markdown.replace(/^- (.*)$/gm, "<li>$1</li>");
  // markdown = markdown.replace(/^(?!<li>)[^\n]*(\n|$)/gm, "<ul>$&</ul>");
  let mdText = markdown;
  // mdText = mdText.replace(/^\* (.*)$/gim, "<li>$1</li>");
  // mdText = mdText.replace(/^\d\. (.*)$/gim, "<li>$1</li>");
  // mdText = mdText.replace(/<\/li>(\n?<li>)/gim, "</li><li>");
  // mdText = mdText.replace(/^\s*<li>/gim, "<ul>\n<li>");
  // mdText = mdText.replace(/<\/li>\s*$/gim, "</li>\n</ul>");
  // mdText = mdText.replace(/^\s*\*\s*(.*)$/gim, "<ul>\n<li>$1</li>\n</ul>");
  // mdText = mdText.replace(/^\s*\d\.\s*(.*)$/gim, "<ol>\n<li>$1</li>\n</ol>");

  mdText = mdText.replace(/^\s*-\s*(.*)$/gim, "\n<ul>\n<li>$1</li>\n</ul>");
  mdText = mdText.replace(/^\s*\*\s*(.*)$/gim, "\n<ul>\n<li>$1</li>\n</ul>");
  mdText = mdText.replace(/^\s*\d\.\s*(.*)$/gim, "\n<ol>\n<li>$1</li>\n</ol>");

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
  // Convert ordered lists
  // markdown = markdown.replace(/^\d+\. (.*)$/gm, "<li>$1</li>");
  // markdown = markdown.replace(/^(?!<li>)[^\n]*(\n|$)/gm, "<ol>$&</ol>");

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

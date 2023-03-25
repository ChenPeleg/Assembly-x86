export const markdownToHTML = (markdown: string): string => {
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

  // Convert unordered lists
  markdown = markdown.replace(/^\* (.*)$/gm, "<li>$1</li>");
  markdown = markdown.replace(/^- (.*)$/gm, "<li>$1</li>");
  markdown = markdown.replace(/^(?!<li>)[^\n]*(\n|$)/gm, "<ul>$&</ul>");

  // Convert ordered lists
  markdown = markdown.replace(/^\d+\. (.*)$/gm, "<li>$1</li>");
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
  markdown = markdown.replace(/\n$/gim, "<br />");
  markdown = markdown.replace(/\n/gim, "<p>$1</p>");

  return markdown;
};

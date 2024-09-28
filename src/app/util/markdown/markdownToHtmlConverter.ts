import { findMdTables } from "./findMdTables";
import { mdTableToHtml } from "./mdTableToHtmlTable";
import { findMdCodeBlocks, mdCodeBlockToHtml } from "./findMdCodeBlocks";

export class MarkdownToHtmlConverter {
  public static readonly ParagraphClass = "paragraph";
  public static readonly InlineCodeClass = "inline-code";
  public static readonly DataCommentClass = "data-comments";
  public readonly html: string;

  constructor(markdown: string) {
    this.html = this.convertHtmlToMarkdown(markdown);
  }

  static convertLineBreaksToNormalized(markdown: string): string {
    markdown = markdown.replace(/\r\n/g, "\n");
    return markdown;
  }

  static convertTablesToHtml(markdown: string): string {
    const allTables = findMdTables(markdown);
    allTables?.forEach((t) => {
      const tableInHtml = mdTableToHtml(t);
      markdown = markdown.replace(t, tableInHtml.outerHTML);
    });
    return markdown;
  }

  static convertCodeBlocksToHtml(markdown: string): string {
    const allCode = findMdCodeBlocks(markdown);
    allCode?.forEach((c) => {
      const codeHtml = mdCodeBlockToHtml(c);
      markdown = markdown.replace(c, codeHtml);
    });
    return markdown;
  }

  static convertListsToHtml(markdown: string): string {
    markdown = markdown.replace(/^\s*-\s*(.*)$/gim, "\n<li>$1</li>");
    markdown = markdown.replace(/^\s*\*\s*(.*)$/gim, "\n<li>$1</li>");

    const wrappedMarkdown = markdown.replace(
      /((<li>[\s\S]*?<\/li>\n\n?){1,})[\s\S]*?$/g,
      "<ol>$1</ol>"
    );

    return wrappedMarkdown;
  }

  static convertHeadingsToHtml(markdown: string): string {
    markdown = markdown.replace(/^# (.*)$/gm, "<h1>$1</h1>");
    markdown = markdown.replace(/^## (.*)$/gm, "<h2>$1</h2>");
    markdown = markdown.replace(/^### (.*)$/gm, "<h3>$1</h3>");
    markdown = markdown.replace(/^#### (.*)$/gm, "<h4>$1</h4>");
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

  static constructorLinksToHtml(markdown: string): string {
    markdown = markdown.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2">$1</a>'
    );
    return markdown;
  }

  static convertBlockquotesToHtml(markdown: string): string {
    markdown = markdown.replace(/^\>(.*)$/gim, "<blockquote>$1</blockquote>");
    markdown = markdown.replace(
      /<!-- ([^>]*) -->\n?<blockquote>/gs,
      `<blockquote class="$1">`
    );
    return markdown;
  }

  static convertInlineCodeToHtml(markdown: string): string {
    markdown = markdown.replace(
      /\`(.*?)\`/gim,
      `<code class="${MarkdownToHtmlConverter.InlineCodeClass}">$1</code>`
    );
    return markdown;
  }

  static convertParagraphsToHtml(markdown: string): string {
    const codeBlockPlaceholder = "CODE_BLOCK_PLACEHOLDER";
    const codeBlocks: string[] = [];

    // Extract code blocks and replace them with placeholders
    markdown = markdown.replace(/<code[^>\n?]*>[\s\S]*?<\/code>/g, (match) => {
      codeBlocks.push(match);
      return codeBlockPlaceholder;
    });

    // Convert paragraphs to HTML
    markdown = (markdown + "\n").replace(
      /(?:\r?\n){2,}([\s\S]+?)(?=(?:\r?\n){2,})/gim,
      (match, p1) => {
        if (p1.match(/<p|<h[1-6]|<li|<code>/)) {
          return p1;
        }

        return `<p data-test="test" class="${MarkdownToHtmlConverter.ParagraphClass}" >${p1}</p>`;
      }
    );

    // Restore code blocks from placeholders
    codeBlocks.forEach((codeBlock, index) => {
      markdown = markdown.replace(codeBlockPlaceholder, codeBlock);
    });

    return markdown;
  }

  static convertCommentsToHtml(markdown: string): string {
    markdown = markdown.replace(
      /^<!--(.*)-->$/gm,
      `<span ${MarkdownToHtmlConverter.DataCommentClass}="$1"></span>`
    );
    return markdown;
  }

  static convertLineBreaksToHtml(markdown: string): string {
    markdown = markdown.replace(/\\\n/gm, `<br>\n`);
    return markdown;
  }

  private convertHtmlToMarkdown(markdown: string): string {
    markdown = MarkdownToHtmlConverter.convertLineBreaksToNormalized(markdown);
    markdown = MarkdownToHtmlConverter.convertTablesToHtml(markdown);
    markdown = MarkdownToHtmlConverter.convertCodeBlocksToHtml(markdown);
    markdown = MarkdownToHtmlConverter.convertListsToHtml(markdown);
    markdown = MarkdownToHtmlConverter.convertHeadingsToHtml(markdown);
    markdown = MarkdownToHtmlConverter.convertBoldAndItalicToHtml(markdown);
    markdown = MarkdownToHtmlConverter.convertImagesToHtml(markdown);
    markdown = MarkdownToHtmlConverter.constructorLinksToHtml(markdown);
    markdown = MarkdownToHtmlConverter.convertBlockquotesToHtml(markdown);
    markdown = MarkdownToHtmlConverter.convertInlineCodeToHtml(markdown);
    markdown = MarkdownToHtmlConverter.convertParagraphsToHtml(markdown);
    markdown = MarkdownToHtmlConverter.convertCommentsToHtml(markdown);
    markdown = MarkdownToHtmlConverter.convertLineBreaksToHtml(markdown);
    return markdown;
  }
}

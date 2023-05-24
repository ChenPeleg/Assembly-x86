export const findMdCodeBlocks = (md: string) => {
  const rgex = /```(?<language>[^\n`]*)(?<code>[^`]*)(?<end>```)/g;
  const codeBlocks = md.match(rgex);

  return (codeBlocks || []).map((t) => t.replace("\n", "\n")).filter((t) => t);
};
export const mdCodeBlockToHtml = (md: string) => {
  const rgex = /```(?<language>[^\n`]*)(?<code>[^`]*)(?<end>```)/g;
  const code = rgex.exec(md)?.groups?.["code"] || "";
  return `<pre><code>${code.replace("\n", "")}</code></pre>`;
};

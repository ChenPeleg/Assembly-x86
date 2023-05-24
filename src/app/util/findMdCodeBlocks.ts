const rgex = /```(?<language>[^\n`]*)(?<code>[^`]*)(?<end>\n```)$/g;

export const findMdCodeBlocks = (md: string) => {
  const codeBlocks = `\n${md}`.match(rgex);
  return (codeBlocks || []).map((t) => t.replace("\n", "\n")).filter((t) => t);
};
export const mdCodeBlockToHtml = (md: string) => {
  const code = rgex.exec(md)?.groups?.["code"] || "";
  return `<code>${code}</code>`;
};

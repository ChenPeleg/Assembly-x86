const fromBorderToBorder = /(\n\|([^\n])*\|)*/;
export const findMdTables = (md: string) => {
  const regex = new RegExp(fromBorderToBorder, "g");
  const tables = md.match(/(\n\|([^\n])*\|)*/g);
  return tables?.map((t) => t.replace("\n", "")).filter((t) => t);
};

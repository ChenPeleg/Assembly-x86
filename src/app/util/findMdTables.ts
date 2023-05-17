export const findMdTables = (md: string) => {
  const tables = `\n${md}`.match(/(\n\|([^\n])*\|)*/g);
  return (tables || []).map((t) => t.replace("\n", "")).filter((t) => t);
};

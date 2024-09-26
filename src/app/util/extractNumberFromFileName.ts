export const extractNumberFromFileName = (
  fileName: string
): { number: number; text: string } => {
  const numberMatch = fileName.match(/\d+/);
  const number = numberMatch ? parseInt(numberMatch[0]) : 0;
  const text = fileName.replace(/\d+/g, "").trim();
  return { number, text };
};

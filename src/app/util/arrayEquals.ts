export const arrayEquals = <T>(a: T[], b: T[]): boolean =>
  a.length === b.length && a.every((val, i) => val === b[i]);

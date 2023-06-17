export const generateNewId = <T extends { id: string }>(objects: T[]) => {
  const allIds = objects.map((o) => +o.id);
  const maxId = Math.max(...allIds, 0);
  return maxId + 1;
};

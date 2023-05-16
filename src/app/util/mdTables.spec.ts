import { findMdTables } from "./findMdTables";

const mdTable = `
| Bit value | Position value as a power of base 2 | Bit number |
|-----------|-------------------------------------|------------|
| 1         | 128                                 | 7          |
| 1         | 64                                  | 6          |
| 1         | 32                                  | 5          |
| 1         | 16                                  | 4          |

some more text and more text

| Another table | Position value as a power of base 2 | Bit number |
|-----------|-------------------------------------|------------|
| 1         | 128                                 | 7          |
`;

describe("Find md tables", () => {
  it("expect to find a simple table", () => {
    const result = findMdTables(mdTable);
    console.log(result);
  });
});

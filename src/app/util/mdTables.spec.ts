import { findMdTables } from "./findMdTables";

const mdTable1 = `| Bit value | Position value as a power of base 2 | Bit number |
|-----------|-------------------------------------|------------|
| 1         | 128                                 | 7          |
| 1         | 64                                  | 6          |
| 1         | 32                                  | 5          |
| 1         | 16                                  | 4          |`;
const mdTable2 = `| Another table | Position value as a power of base 2 | Bit number |
|-----------|-------------------------------------|------------|
| 1         | 128                                 | 7          |`;
describe("Find md tables", () => {
  it("expect to find simple table", () => {
    const result = findMdTables(mdTable1);
    if (!result) {
      throw `no results`;
    }
    expect(result[0]).toBe(mdTable1);
  });
  it("expect to find simple table 2", () => {
    const result = findMdTables(mdTable2);
    if (!result) {
      throw `no results`;
    }
    expect(result[0]).toBe(mdTable2);
  });
  it("expect to find simple table if there are chars in front of it", () => {
    const result = findMdTables(`\n abc 123 \n${mdTable2}`);
    if (!result) {
      throw `no results`;
    }
    expect(result[0]).toBe(mdTable2);
  });
  it("expect to find simple table if there are chars in front of it", () => {
    const result = findMdTables(`\n abc 123 \n${mdTable1}`);
    if (!result) {
      throw `no results`;
    }
    expect(result[0]).toBe(mdTable1);
  });
  it("expect to find simple table if there are chars in after it", () => {
    const result = findMdTables(`${mdTable1} \n abc 123 \n`);
    if (!result) {
      throw `no results`;
    }
    expect(result[0]).toBe(mdTable1);
  });
  it("expect to find 2 tables if there is a line break between them", () => {
    const result = findMdTables(`${mdTable1} \n\n${mdTable2}`);
    if (!result) {
      throw `no results`;
    }
    expect(result[0]).toBe(mdTable1);
    expect(result[1]).toBe(mdTable2);
  });
});

import { findMdTables } from "../findMdTables";
import { result } from "lodash";
import { mdTableToHtml } from "../mdTableToHtmlTable";

const mdTable1 = `| Bit value | Position value as a power of base 2 | Bit number |
|-----------|-------------------------------------|------------|
| 1         | 128                                 | 7          |
| 1         | 64                                  | 6          |
| 1         | 32                                  | 5          |
| 1         | 16                                  | 4          |`;
const mdTable2 = `| Another table | Position value as a power of base 2 | Bit number |
|-----------|-------------------------------------|------------|
| 1         | 128                                 | 7          |`;

const fileExample = `# Bit talbes md

| Bit value | Position value as a power of base 2 | Bit number |
|-----------|-------------------------------------|------------|
| 1         | 128                                 | 7          |
| 1         | 64                                  | 6          |
| 1         | 32                                  | 5          |
| 1         | 16                                  | 4          |
| 1         | 8                                   | 3          |
| 1         | 4                                   | 2          |
| 1         | 2                                   | 1          |
| 1         | 1                                   | 0          |

`;
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

  it("expect to find 1 tables in the file example", () => {
    const result = findMdTables(`${fileExample}`);
    if (!result) {
      throw `no results`;
    }
    console.log(result);
    expect(result.length).toBe(1);
  });
});
describe("Find md tables", () => {
  it("converts tables to html correctly 1", () => {
    const table1 = findMdTables(`${mdTable1}`) as string[];

    const result = mdTableToHtml(table1[0]) as HTMLTableElement;

    const headers = result.querySelectorAll("th");
    const rows = result.querySelectorAll("tr");
    expect(headers.length).toBe(3);
    expect(rows.length).toBe(6);
  });
});

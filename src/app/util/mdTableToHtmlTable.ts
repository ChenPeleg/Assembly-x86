export const mdTableToHtml = (markdownTable: string) => {
  // Split the Markdown table into rows and columns.
  const rows = markdownTable.split("\n");
  const columns = rows[0].split("|");

  // Create an HTML table.
  const table = document.createElement("table");

  // Add the table headers.
  const tHeaderRow = document.createElement("tr");
  table.appendChild(tHeaderRow);
  for (const column of columns) {
    const header = document.createElement("th");
    header.textContent = column;
    tHeaderRow.appendChild(header);
  }

  // Add the table rows.
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split("|");
    const tr = document.createElement("tr");
    for (const cell of row) {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  return table;
};

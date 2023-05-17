export const mdTableToHtml = (markdownTable: string) => {
  // Split the Markdown table into rows and columns.
  const rows = markdownTable.split("\n");
  const firstRowColumns = rows[0].split("|").filter((c) => c);

  // Create an HTML table.
  const table = document.createElement("table");

  // Add the table headers.
  const thead = document.createElement("thead");
  const tHeaderRow = document.createElement("tr");
  thead.appendChild(tHeaderRow);
  table.appendChild(thead);
  for (const column of firstRowColumns) {
    const header = document.createElement("th");
    header.textContent = column;
    tHeaderRow.appendChild(header);
  }
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  // Add the table rows.

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split("|");
    const tr = document.createElement("tr");

    for (const cell of row) {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  return table;
};

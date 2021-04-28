import React from 'react';

const Row = ({ columns, row, format }) => {
  return (
    <tr> 
      {columns.map((col) => {
        return <td key={col.property + row[col.property]}>{format(col.property, row[col.property])}</td>;
      })}
    </tr>
  )
};

const Table = ({ page, perPage, columns, rows, format }) => {
  const start = page * perPage;
  const end = (page + 1) * perPage;
  const filteredRows = rows.slice(start, end);

  const header = columns.map((column) => {
    return <th key={column.name}>{column.name}</th>
  });

  const tableBody = filteredRows.map((row) => {
      return <Row key={Object.values(row).join(':')} row={row} columns={columns} format={format} />;
  });

  return (
    <table>
      <thead>
        <tr>
          {header}
        </tr>
      </thead>
      <tbody>
        {tableBody}
      </tbody>
    </table>
  )
};

export default Table;

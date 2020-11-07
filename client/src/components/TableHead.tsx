import React from "react";

interface TableHeadProps {
  tableHeaders: string[];
}

const TableHead: React.FC<TableHeadProps> = ({ tableHeaders }) => {
  return (
    <thead>
      <tr>
        {tableHeaders.map((header: string, index: number) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;

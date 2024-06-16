import React, { useState, useEffect } from 'react';

interface TableProps {
  data: {
    headers: string[];
    rows: React.ReactNode[][];
  };
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<{
    headers: string[];
    rows: React.ReactNode[][];
  }>({ headers: [], rows: [] });

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <div className="relative overflow-x-auto shadow rounded-md">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {tableData.headers.map((header, index) => (
              <th key={index} scope="col" className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b hover:bg-gray-100">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

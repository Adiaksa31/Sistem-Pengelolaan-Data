import React, { useState, useEffect } from 'react';

interface TableProps {
  data: {
    headers: string[];
    rows: (React.ReactNode | null | undefined)[][];
  };
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<{
    headers: string[];
    rows: (React.ReactNode | null | undefined)[][];
  }>({ headers: [], rows: [] });

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({
    key: '',
    direction: '',
  });

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCurrentPage(1); // Reset current page when search term changes
  }, [searchTerm]);

  const sortTable = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedRows = () => {
    const sortableRows = [...tableData.rows];
    if (sortConfig.key !== '') {
      sortableRows.sort((a, b) => {
        const index = tableData.headers.indexOf(sortConfig.key);
        const valueA = index !== -1 ? a[index] : '';
        const valueB = index !== -1 ? b[index] : '';
        if (valueA === null || valueA === undefined) return -1;
        if (valueB === null || valueB === undefined) return 1;
        if (valueA < valueB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableRows;
  };

  const filteredRows = sortedRows().filter(row =>
    row.some(cell => (cell?.toString().toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredRows.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className='relative'>
        <input
          type="text"
          className="block ps-10 py-2 text-sm border rounded-lg w-60 md:w-60"
          placeholder="Cari Data..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
      </div>
      <div className='pb-2'></div>
      <div className="relative overflow-x-auto shadow rounded-md">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {tableData.headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => sortTable(header)}
                >
                  <div className="flex items-center justify-between">
                    <span>{header}</span>
                    {sortConfig.key === header && (
                      <span>{sortConfig.direction === 'ascending' ? ' ↓' : ' ↑'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-white border-b hover:bg-gray-100">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-4">
                      {cell !== null && cell !== undefined ? cell : ''}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableData.headers.length} className="px-4 py-4 text-center">
                  Tidak Ada Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
        <div className="join flex justify-center items-center space-x-3 pb-5">
          <button
            className="join-item btn-sm"
            onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            «
          </button>
          <button className="join-item btn btn-sm">Halaman {currentPage}</button>
          <button
            className="join-item btn-sm"
            onClick={() =>
              setCurrentPage((prev) =>
                prev < Math.ceil(filteredRows.length / itemsPerPage) ? prev + 1 : prev
              )
            }
          >
            »
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;

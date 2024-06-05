// components/DataTable.js
'use client'
// components/DataTable.js
// components/DataTable.js
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box } from '@mui/material';
import 'daisyui';

const DataTable = ({ rows, columns }) => {
  const [searchText, setSearchText] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const [pageSize, setPageSize] = React.useState(5);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const filtered = rows.filter((row) => {
      return Object.keys(row).some((field) =>
        row[field]
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    });
    setFilteredRows(filtered);
  };

  React.useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  return (
    <Box className="p-4 bg-base-100 rounded-lg shadow-md">
      <div className="mb-4">
        <TextField
          variant="outlined"
          placeholder="Search…"
          value={searchText}
          onChange={(e) => requestSearch(e.target.value)}
          className="w-full bg-white rounded-lg"
        />
      </div>
      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: 600 }} className="bg-white rounded-lg shadow-lg">
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
    </Box>
  );
};

export default DataTable;


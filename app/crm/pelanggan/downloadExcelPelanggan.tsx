// components/DownloadExcel.tsx

import { FC, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Pelanggan = {
  id: number;
  nama: string;
  email: string;
  no_wa: number;
  tgl_lahir: any;
  agama: string;
  id_pekerjaan: any;
  pekerjaan: any;
  jenis_kelamin: string;
  id_kelurahan: any;
  id_kecamatan: any;
  id_kabupaten: any;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
}

type DownloadExcelProps = {
  data: Pelanggan[];
  headers: string[];
  fileName: string;
};

const DownloadExcel: FC<DownloadExcelProps> = ({ data, headers, fileName }) => {
  const [filterAgama, setFilterAgama] = useState<string | null>(null);
  const [filterJenisKelamin, setFilterJenisKelamin] = useState<string | null>(null);
  const [filterPekerjaan, setFilterPekerjaan] = useState<string | null>(null);

  const applyFilter = () => {
    let filteredData = data;

    if (filterAgama) {
      filteredData = filteredData.filter(pelanggan => pelanggan.agama === filterAgama);
    }

    if (filterJenisKelamin) {
      filteredData = filteredData.filter(pelanggan => pelanggan.jenis_kelamin === filterJenisKelamin);
    }

    if (filterPekerjaan) {
      filteredData = filteredData.filter(pelanggan => pelanggan.pekerjaan.nama_pekerjaan === filterPekerjaan);
    }

    return filteredData;
  };

  const exportToExcel = () => {
    const filteredData = applyFilter();

    const formattedData = filteredData.map((pelanggan, index) => ({
      'NO': index + 1,
      'NAMA PELANGGAN': pelanggan.nama,
      'NOMOR WA': pelanggan.no_wa,
      'EMAIL': pelanggan.email,
      'TANGGAL LAHIR': new Date(pelanggan.tgl_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      'JENIS KELAMIN': pelanggan.jenis_kelamin,
      'AGAMA': pelanggan.agama,
      'PEKERJAAN': pelanggan.pekerjaan.nama_pekerjaan,
      'KELURAHAN': pelanggan.kelurahan, 
      'KECAMATAN' : pelanggan.kecamatan, 
      'KABUPATEN' : pelanggan.kabupaten,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const colWidths = headers.map(header => ({ wch: header.length + 12 }));
    worksheet['!cols'] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Pelanggan');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, `${fileName}.xlsx`);
  };

  return (
    <div className="flex space-x-1 items-center">
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <button
        className="flex justify-center space-x-2 items-center font-bold text-xs px-4 md:px-5 py-1.5 text-white rounded bg-green-600"
      >
        Unduh Excel
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        </svg>
      </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter Data</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className='px-2 py-2'>
   {/* Filter untuk Agama */}
   <select
        value={filterAgama || ''}
        onChange={(e) => setFilterAgama(e.target.value || null)}
        className="px-2 w-full py-2 border border-gray-300 rounded-md"
      >
        <option value="">Semua Agama</option>
        {Array.from(new Set(data.map(pelanggan => pelanggan.agama))).map(agama => (
          <option key={agama} value={agama}>{agama}</option>
        ))}
      </select>
        </div>
        <div className='px-2 py-2'>
  {/* Filter untuk Jenis Kelamin */}
  <select
        value={filterJenisKelamin || ''}
        onChange={(e) => setFilterJenisKelamin(e.target.value || null)}
        className="px-2 w-full py-2 border border-gray-300 rounded-md"
      >
        <option value="">Semua Jenis Kelamin</option>
        {Array.from(new Set(data.map(pelanggan => pelanggan.jenis_kelamin))).map(jenis_kelamin => (
          <option key={jenis_kelamin} value={jenis_kelamin}>{jenis_kelamin}</option>
        ))}
      </select>
        </div>
        <div className='px-2 py-2'>
  {/* Filter untuk Pekerjaan */}
      <select
        value={filterPekerjaan || ''}
        onChange={(e) => setFilterPekerjaan(e.target.value || null)}
        className="px-2 w-full py-2 border border-gray-300 rounded-md"
      >
        <option value="">Semua Pekerjaan</option>
        {Array.from(new Set(data.map(pelanggan => pelanggan.pekerjaan.nama_pekerjaan))).map(pekerjaan => (
          <option key={pekerjaan} value={pekerjaan}>{pekerjaan}</option>
        ))}
      </select>
        </div>

        <div className='px-2 py-2'>
        <button
            onClick={exportToExcel}
            className="flex justify-center items-center w-full space-x-2 font-bold text-xs px-4 md:px-5 py-1.5 text-white rounded bg-green-600"
            >
            <span>Unduh Data</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
            </button>

        </div>
       
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
};

export default DownloadExcel;

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
import { HiOutlineDownload } from "react-icons/hi";

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
  const [filterKabupaten, setFilterKabupaten] = useState<string | null>(null);
  const [filterKecamatan, setFilterKecamatan] = useState<string | null>(null);
  const [filterKelurahan, setFilterKelurahan] = useState<string | null>(null);

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

    if (filterKabupaten) {
      filteredData = filteredData.filter(pelanggan => pelanggan.kabupaten === filterKabupaten);
    }

    if (filterKecamatan) {
      filteredData = filteredData.filter(pelanggan => pelanggan.kecamatan === filterKecamatan);
    }

    if (filterKelurahan) {
      filteredData = filteredData.filter(pelanggan => pelanggan.kelurahan === filterKelurahan);
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

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  return (
    <div className="flex space-x-1 items-center">
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <button
        className="flex justify-center gap-1 items-center font-bold text-xs px-4 md:px-5 py-1.5 text-white rounded bg-green-600"
      >
        Unduh Excel
        <HiOutlineDownload size={23}/>
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
        {/* Filter untuk Kabupaten */}
      <select
        value={filterKabupaten || ''}
        onChange={(e) => setFilterKabupaten(e.target.value || null)}
        className="px-2 w-full py-2 border border-gray-300 rounded-md"
      >
        <option value="">Semua Kabupaten</option>
        {Array.from(new Set(data.map(pelanggan => pelanggan.kabupaten))).map(kabupaten => (
          <option key={kabupaten} value={kabupaten}>{capitalizeFirstLetter(kabupaten)}</option>
        ))}
      </select>
        </div>

        <div className='px-2 py-2'>     
        {/* Filter untuk Kecamatan */}
      <select
        value={filterKecamatan || ''}
        onChange={(e) => setFilterKecamatan(e.target.value || null)}
        className="px-2 w-full py-2 border border-gray-300 rounded-md"
      >
        <option value="">Semua Kecamatan</option>
        {Array.from(new Set(data.map(pelanggan => pelanggan.kecamatan))).map(kecamatan => (
          <option key={kecamatan} value={kecamatan}>{capitalizeFirstLetter(kecamatan)}</option>
        ))}
      </select>
        </div>

        <div className='px-2 py-2'>     
        {/* Filter untuk Kelurahan */}
      <select
        value={filterKelurahan || ''}
        onChange={(e) => setFilterKelurahan(e.target.value || null)}
        className="px-2 w-full py-2 border border-gray-300 rounded-md"
      >
        <option value="">Semua Kelurahan</option>
        {Array.from(new Set(data.map(pelanggan => pelanggan.kelurahan))).map(kelurahan => (
          <option key={kelurahan} value={kelurahan}>{capitalizeFirstLetter(kelurahan)}</option>
        ))}
      </select>
        </div>


        <div className='px-2 py-2'>
        <button
            onClick={exportToExcel}
            className="flex justify-center items-center w-full space-x-2 font-bold text-xs px-4 md:px-5 py-1.5 text-white rounded bg-green-600"
            >
            <span>Unduh Data</span>
            <HiOutlineDownload size={23}/>
            </button>

        </div>
       
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
};

export default DownloadExcel;

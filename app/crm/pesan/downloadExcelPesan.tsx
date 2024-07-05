import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Pesanan {
  costumer?: { nama: string };
  sumber?: string;
  kategori?: { nama: string };
  type_motor?: string;
  warna_motor?: string;
  model_motor?: string;
  jenis_pembayaran?: string;
  jenis_service?: string;
  jadwal_service?: number;
  jenis_sparepart?: string;
  nama_sparepart?: string;
  jenis_keluhan?: string;
  jenis_informasi?: string;
  keterangan?: string;
  cabang?: { nama: string };
  crm?: { nama: string };
  tujuan_user?: { nama: string };
  status_kontak?: string;
}

interface Props {
  data: Pesanan[];
}

const DownloadExcel: React.FC<Props> = ({ data }) => {
  const [filterKategori, setFilterKategori] = useState<string>('');
  const [filterSumber, setFilterSumber] = useState<string>('');
  const [filterCabang, setFilterCabang] = useState<string>('');

  // Function to apply filter based on filterKategori, filterSumber, and filterCabang
  const applyFilter = () => {
    let filteredData = data;

    if (filterKategori) {
      filteredData = filteredData.filter(pesanan => pesanan.kategori?.nama === filterKategori);
    }

    if (filterSumber) {
      filteredData = filteredData.filter(pesanan => pesanan.sumber === filterSumber);
    }

    if (filterCabang) {
      filteredData = filteredData.filter(pesanan => pesanan.cabang?.nama === filterCabang);
    }

    return filteredData;
  };

  // Function to handle Excel download
  const handleDownload = () => {
    const filteredData = applyFilter();
    const fileName = 'pesanan.xlsx';

    const mappedData = filteredData.map((pesanan, index) => ({
      'No': index + 1,
      'Nama Pelanggan': pesanan.costumer?.nama || '-',
      'Sumber Pesanan': pesanan.sumber || '-',
      'Kategori Pesanan': pesanan.kategori?.nama || '-',
      'Type Motor': pesanan.type_motor || '-',
      'Warna Motor': pesanan.warna_motor || '-',
      'Model Motor': pesanan.model_motor || '-',
      'Jenis Pembayaran': pesanan.jenis_pembayaran || '-',
      'Jenis Service': pesanan.jenis_service || '-',
      'Jadwal Service': formattedJadwalService(pesanan.jadwal_service) || '-',
      'Jenis Sparepart': pesanan.jenis_sparepart || '-',
      'Nama Sparepart': pesanan.nama_sparepart || '-',
      'Jenis Keluhan': pesanan.jenis_keluhan || '-',
      'Jenis Informasi': pesanan.jenis_informasi || '-',
      'Keterangan': pesanan.keterangan || '-',
      'Cabang': pesanan.cabang?.nama || '-',
      'CRM': pesanan.crm?.nama || '-',
      'Tujuan User': pesanan.tujuan_user?.nama || '-',
      'Status Kontak': pesanan.status_kontak || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(mappedData);

    // Adjust column widths based on content length
    const colWidths = [
      { wpx: 30 },
      { wpx: 150 }, // Nama Pelanggan
      { wpx: 100 }, // Sumber Pesanan
      { wpx: 100 }, // Kategori Pesanan
      { wpx: 100 }, // Type Motor
      { wpx: 100 }, // Warna Motor
      { wpx: 100 }, // Model Motor
      { wpx: 100 }, // Jenis Pembayaran
      { wpx: 100 }, // Jenis Service
      { wpx: 100 }, // Jadwal Service
      { wpx: 100 }, // Jenis Sparepart
      { wpx: 100 }, // Nama Sparepart
      { wpx: 100 }, // Jenis Keluhan
      { wpx: 100 }, // Jenis Informasi
      { wpx: 300 }, // Keterangan
      { wpx: 100 }, // Cabang
      { wpx: 100 }, // CRM
      { wpx: 100 }, // Tujuan User
      { wpx: 100 }, // Status Kontak
    ];

    worksheet['!cols'] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pesanan');

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, fileName);
  };

  // Function to format jadwal_service if needed
  const formattedJadwalService = (jadwal_service?: number) => {
    if (!jadwal_service) return '-';
    return new Date(jadwal_service).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
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
            {/* Dropdown untuk filter kategori */}
            <select
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              className="px-2 w-full py-2 border border-gray-300 rounded-md mb-2"
            >
              <option value="">Semua Kategori</option>
              {Array.from(new Set(data.map(pesanan => pesanan.kategori?.nama))).map((namaKategori, index) => (
                <option key={index} value={namaKategori}>{namaKategori}</option>
              ))}
            </select>
            
            {/* Dropdown untuk filter sumber */}
            <select
              value={filterSumber}
              onChange={(e) => setFilterSumber(e.target.value)}
              className="px-2 w-full py-2 border border-gray-300 rounded-md mb-2"
            >
              <option value="">Semua Sumber</option>
              {Array.from(new Set(data.map(pesanan => pesanan.sumber))).map((sumber, index) => (
            <option key={index} value={sumber}>{sumber}</option>
            ))}
            </select>
                    {/* Dropdown untuk filter cabang */}
        <select
          value={filterCabang}
          onChange={(e) => setFilterCabang(e.target.value)}
          className="px-2 w-full py-2 border border-gray-300 rounded-md mb-2"
        >
          <option value="">Semua Cabang</option>
          {Array.from(new Set(data.map(pesanan => pesanan.cabang?.nama))).map((namaCabang, index) => (
            <option key={index} value={namaCabang}>{namaCabang}</option>
          ))}
        </select>
      </div>
      <div className='px-2 py-2'>
        <button
          onClick={handleDownload}
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


'use client'
import Link from "next/link";
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import AddPesan from "./addPesan";
import DeletePesan from "./deletePesan";
import UpdatePesan from "./updatePesan";
import Table from "../components/table";
import Aksi from "../components/aksi";
import Pagination from "../components/pagination";
import { useState, useEffect } from 'react';
import token from "../components/token";

async function getPesanans() {
  const res = await fetch('http://localhost:3000/api/pesanan/get',{
    cache: "no-store",
    method: 'POST',
    headers:{
      'Authorization': 'Bearer ' + token,
    }}).then(response => response.json())
		.then(response => {
      if (response.status === 'error') {
      } else {
        return response.data;
      }
    })
		.catch(err => console.error(err));

  return res;
}
type Pesanan = {
  id: number;
  kategori: any;
  kategori_id: any;
    costumer: any;
    costumer_id: any;
    sumber: string;
    type_motor: string;
    warna_motor: string;
    model_motor: string;
    jenis_pembayaran: string;
    jenis_service: string;
    jadwal_service: number;
    jenis_sparepart: string;
    nama_sparepart: string;
    jenis_keluhan: string;
    jenis_informasi: string;
    keterangan: string;
    cabang: any;
    cabang_id: any;
    crm: any;
    crm_id: any;
    tujuan_user:any;
    status_kontak: string;
}

export default function Pesan() {
  const [pesanans, setPesanans] = useState([]);

  const pesananType = pesanans as Pesanan[];

  useEffect(() => {
    async function fetchData() {
      try {
        const pesananData = await getPesanans();
        setPesanans(pesananData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    const intervalId = setInterval(fetchData, 1000); 
    return () => clearInterval(intervalId);
  }, []);

  const tableData = {
    headers: ['No', 'Nama Pelanggan', 'Keterangan', 'Kategori', 'Cabang', 'Admin CRM', 'Tujuan Staf', 'Status', 'Action'],
      rows: pesananType.map((pesanan, index) => [
        index + 1,
        pesanan.costumer.nama,
        pesanan.keterangan,
        pesanan.kategori.nama,
        pesanan.cabang.nama,
        pesanan.crm.nama,
        pesanan.tujuan_user.nama,
        pesanan.status_kontak,
        <div key={`aksi-${index}`} className="container mx-auto">
          <Aksi><UpdatePesan pesanan={pesanan} /> <DeletePesan {...pesanan} /> </Aksi>
        </div>
      ]),
    };
  return (
  <>
    <NavAdmAts />
    <NavAdmBwh currentPath="/crm/pesan"/>
    <div className="p-3 md:px-10">
    <div className="px-3 pb-3 bg-white shadow">
    <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
          <div>
          <h1 className="font-black md:py-2 md:px-1 text-3xl">Pesan/Kontak</h1>
          </div>
      <div className="flex flex-wrap items-center -mx-3 space-x-3">
       <div className="px-3 pb-3 md:pb-0">
         <div className="flex space-x-1 items-center font-bold text-xs px-4 md:px-5 py-1.5 text-white rounded bg-green-600">
              <Link href="#">Unduh Excel</Link>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
          </div>
       </div>
        <label className="sr-only">Search</label>
        <div className="relative">
              <input type="text" id="table-search-users" className="block ps-10 py-2 text-sm border rounded-lg w-60 md:w-60 bg-white focus:ring-D32124 focus:border-D32124" placeholder="Search..." />
              <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
          </div>
          <AddPesan></AddPesan>
        </div>
      </div>
      <div>
      <Table data={tableData} 
      />
    </div>
    <br />
    <Pagination />
        
        
    </div>
    </div>
  </>
  );
}

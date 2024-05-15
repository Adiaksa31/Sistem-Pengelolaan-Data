'use client'
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import AddCabang from "./addCabang";
import DeleteCabang from "./deleteCabang";
import UpdateCabang from "./updateCabang";
import Table from "../components/table";
import Aksi from "../components/aksi";
import Pagination from "../components/pagination";
import token from "../components/token";

import { useState, useEffect } from 'react';

async function getCabangs() {
  const res = await fetch('http://localhost:3000/api/cabang/get',{
    cache: "no-store",
    method: 'POST',
    headers:{
      'Authorization': 'Bearer ' + token,
    }}).then(response => response.json())
		.then(response => {
      if (response.status === 'error') {
        // console.error('ERROR: ', response.message); // Buat ngecek errornya apa
      } else {
        // console.log('DATA: ', response.data); // Buat ngecek datanya
        return response.data;
      }
    })
		.catch(err => console.error(err));

  return res;
}
type Cabang = {
  id: number;
  nama_cabang: string;
  status_cabang: string;
  alamat_cabang: string;
  nomor: number;
}


export default function Cabang() {
  const [cabangs, setCabangs] = useState([]);

  const cabangType = cabangs as Cabang[];
  useEffect(() => {
    async function fetchData() {
      try {
        const cabangData = await getCabangs();
        setCabangs(cabangData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const intervalId = setInterval(fetchData, 1000); 
    return () => clearInterval(intervalId);
  }, []);

  const tableData = {
    headers: ['No', 'Nama Cabang', 'Alamat', 'Nomor', 'Status', 'Action'],
    rows: cabangType.map((cabang, index) => [
      index + 1,
      cabang.nama_cabang,
      cabang.alamat_cabang,
      cabang.nomor,
      cabang.status_cabang,
    
      <div key={`aksi-${index}`} className="container mx-auto">
         <Aksi><UpdateCabang cabang={cabang} /><DeleteCabang {...cabang} /> </Aksi></div>
    ]),
  };
  return (
  <>
    <NavAdmAts />
    <NavAdmBwh currentPath="/admin/cabang"/>
    <div className="p-3 md:px-10">
    <div className="px-3 pb-3 bg-white shadow">
    <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
          <div>
          <h1 className="font-black py-2 px-1 text-3xl">Cabang</h1>
          </div>
        <div className="flex items-center space-x-3">
        <div className="relative"> 
              <label className="sr-only">Search</label>
              <input type="text" id="table-search-users" className="block ps-10 py-2 text-sm border rounded-lg w-60 md:w-60 bg-white focus:ring-D32124 focus:border-D32124" placeholder="Search..." />
              <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
          </div>
          <AddCabang/>
        </div>
      </div>
      <div>
      <Table data={tableData} />
      </div>
    <br />
    <Pagination />
        
    </div>
    </div>
  </>
  );
}

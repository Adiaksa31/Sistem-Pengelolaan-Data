"use client";
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import AddJabatan from "./addJabatan";
import DeleteJabatan from "./deleteJabatan";
import UpdateJabatan from "./updateJabatan";
import Table from "../components/table";
import Aksi from "../components/aksi";
import Pagination from "../components/pagination";
import { useState, useEffect } from 'react';
import token from "../components/token";

async function getPosisis() {
  const res = await fetch('http://localhost:3000/api/jabatan/get',{
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
type Posisi = {
  id: number;
  nama: string;
  nama_posisi: string;
  status: string;
}


export default function Jabatan() {
  const [posisis, setPosisis] = useState([]);

  const posisiType = posisis as Posisi[];
  useEffect(() => {
    async function fetchData() {
      try {
        const posisiData = await getPosisis();
        setPosisis(posisiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
 
  const tableData = {
    headers: ['No', 'Nama Jabatan', 'Status', 'Action'],
    rows: posisiType.map((posisi, index) => [
      index + 1,
      posisi.nama_posisi,
      posisi.status,
    
      <div key={`aksi-${index}`} className="container mx-auto">
         <Aksi>
         <UpdateJabatan posisi={posisi} />
        <DeleteJabatan {...posisi} /> </Aksi>
        </div>
    ]),
  };
 
  return (
  <>
    <NavAdmAts />
    <NavAdmBwh currentPath="/admin/jabatan"/>
  
    <div className="p-3 md:px-10">
    <div className="px-3 pb-3 bg-white shadow">
    <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
          <div>
          <h1 className="font-black py-2 px-1 text-3xl">Jabatan</h1>
          </div>
        <div className="flex items-center space-x-3">
        <div className="relative">
              <input type="text" id="table-search-users" className="block ps-10 py-2 text-sm border rounded-lg w-60 md:w-60 bg-white focus:ring-D32124 focus:border-D32124" placeholder="Search..." />
              <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
          </div>
          <AddJabatan></AddJabatan>
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

'use client'
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import BtnData from "../components/btnData";
import Table from "../components/table";
import Aksi from "../components/aksi";
import Pagination from "../components/pagination";
import { useState, useEffect } from 'react';

// Ini masih cara manual ngeset token, nanti bakal diubah pake cara otomatis (biasanya kamu ambil dari session aplikasi)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1hIjoiQWd1bmciLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsIm5vbW9yIjoiMTExMTExMSIsInBvc2lzaV9pZCI6MSwiY2FiYW5nX2lkIjoxLCJzdGF0dXNfdXNlciI6InllcyIsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTAyVDExOjA3OjU1LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0wMlQxMTowNzo1NS4wMDBaIn0sImlhdCI6MTcxNDk2NTYzMSwiZXhwIjoxNzE1MDUyMDMxfQ.pAWcRHpfq4UREZVwAKSOi-OspGGG-bt3WO7PJLxdcQ8';

// fungsi ini bisa di taruh di lain file kalau kamu mau (misal: hooks/useUsers.ts)
async function getKategoris() {
  const res = await fetch('http://localhost:3000/api/kategori/get',{
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
type Kategori = {
  id: number;
  nama_kategori: string;
  status_kategori: string;
}


export default function Kategori() {
  const [kategoris, setKategoris] = useState([]);
  const kategoriType = kategoris as Kategori[];

  useEffect(() => {
    async function fetchData() {
      try {
        const kategoriData = await getKategoris();
        setKategoris(kategoriData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const modalContent = (
    <div className="p-4">
      <h1 className="text-center font-bold">Tambah Data Kategori</h1>
      <br />
      <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Nama Kategori
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nama Kategori..." />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Status
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option disabled selected>-- Pilih Status --</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>
      </form>
    </div>
  );
  const mdlEditDataContent = (
    <div className="p-4">
      <h1 className="text-center font-bold">Edit Data Kategori</h1>
      <br />
      <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Nama Kategori
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nama Kategori..." />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Status
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option disabled selected>-- Pilih Status --</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>
      </form>
    </div>
  );
  const tableData = {
    headers: ['No', 'Nama Kategori', 'Status', 'Action'],
    rows: kategoriType.map((kategori, index) => [
      index + 1,
      kategori.nama_kategori,
      kategori.status_kategori,
    
      <div key={`aksi-${index}`} className="container mx-auto">
        <Aksi content={mdlEditDataContent}/>
      </div>
    ]),
  };
  return (
  <>
    <NavAdmAts />
    <NavAdmBwh currentPath="/admin/kategori"/>
  
    <div className="p-3 md:px-10">
    <div className="px-3 pb-3 bg-white shadow">
    <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
          <div>
          <h1 className="font-black py-2 px-1 text-3xl">Kategori</h1>
          </div>
          <label className="sr-only">Search</label>
        <div className="flex items-center space-x-3">
        <div className="relative">
              <input type="text" id="table-search-users" className="block ps-10 py-2 text-sm border rounded-lg w-60 md:w-60 bg-white focus:ring-D32124 focus:border-D32124" placeholder="Search..." />
              <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
          </div>
          <BtnData
           content={modalContent}
          ></BtnData>
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

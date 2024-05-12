'use client'
import Link from "next/link";
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import AddPelanggan from "./addPelanggan";
import DeletePelanggan from "./deletePelanggan";
import UpdatePelanggan from "./updatePelanggan";
import Table from "../components/table";
import Aksi from "../components/aksi";
import Pagination from "../components/pagination";
import { useState, useEffect } from 'react';


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1hIjoiQWd1bmciLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsIm5vbW9yIjoiMTExMTExMSIsInBvc2lzaV9pZCI6MSwiY2FiYW5nX2lkIjoxLCJzdGF0dXNfdXNlciI6InllcyIsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTAyVDExOjA3OjU1LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0wMlQxMTowNzo1NS4wMDBaIn0sImlhdCI6MTcxNTUzNTc3MywiZXhwIjoxNzE1NjIyMTczfQ.RoZzfE9c9FQLGHzcduDGD-8f6gYS8o1Ave0MPY8PaC4';

async function getPelanggans() {
  const res = await fetch('http://localhost:3000/api/pelanggan/get',{
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
type Pelanggan = {
  id: number;
  nama: string;
  email: string;
  no_wa: number;
  tgl_lahir: any;
  agama: string;
  id_pekerjaan: any;
  jenis_kelamin: string;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
}

export default function Pelanggan() {
  const [pelanggans, setPelanggans] = useState([]);

  const pelangganType = pelanggans as Pelanggan[];

  useEffect(() => {
    async function fetchData() {
      try {
        const pelangganData = await getPelanggans();
        setPelanggans(pelangganData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const mdlEditDataContent = (
    <div className="p-4">
      <h1 className="text-center font-bold text-xl">Edit Data Pelanggan</h1>
      <br />
      <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Nama Pelanggan
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nama Pelanggan..." />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Nomor Wa
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nomor wa..." />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Jenis Kelamin
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option disabled selected>-- Pilih Jenis Kelamin --</option>
                    <option>Laki-Laki</option>
                    <option>Perempuan</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Agama
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option disabled selected>-- Pilih Agama --</option>
                    <option>Hindu</option>
                    <option>Islam</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                  Alamat
                </label>
                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Tanggal Lahir
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="date" placeholder="Tanggal lahir..." />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Pekerjaan
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option disabled selected>-- Pilih Pekerjaan --</option>
                    <option>Pegawai Swasta</option>
                    <option>PNS</option>
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
    headers: ['No', 'Nama Pelanggan', 'Nomor Wa', 'Email', 'Jenis Kelamin', 'Agama', 'Alamat', 'Tanggal Lahir', 'Pekerjaan', 'Action'],
    rows: pelangganType.map((pelanggan, index) => [
      index + 1,
      pelanggan.nama,
      pelanggan.no_wa,
      pelanggan.email,
      pelanggan.jenis_kelamin,
      pelanggan.agama,
      `Kel.${pelanggan.kelurahan}, Kec.${pelanggan.kecamatan}, Kab.${pelanggan.kabupaten}`,
      new Date(pelanggan.tgl_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      pelanggan.id_pekerjaan,
      <div key={`aksi-${index}`} className="container mx-auto">
        <Aksi><UpdatePelanggan pelanggan={pelanggan} /> <DeletePelanggan {...pelanggan} /> </Aksi>
      </div>
    ]),
  };
  return (
  <>
    <NavAdmAts />
    <NavAdmBwh currentPath="/crm/pelanggan"/>
    <div className="p-3 md:px-10">
    <div className="px-3 pb-3 bg-white shadow">
    <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
          <div>
          <h1 className="font-black py-2 px-1 text-3xl">Pesan/Kontak</h1>
          </div>
          
        <div className="flex items-center space-x-3">
        <div className="flex space-x-1 items-center font-bold text-xs px-4 md:px-5 py-1.5 text-white rounded bg-green-600">
              <Link href="#">Unduh Excel</Link>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
          </div>
        <label className="sr-only">Search</label>
        <div className="relative">
              <input type="text" id="table-search-users" className="block ps-10 py-2 text-sm border rounded-lg w-60 md:w-60 bg-white focus:ring-D32124 focus:border-D32124" placeholder="Search..." />
              <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
          </div>
          <AddPelanggan></AddPelanggan>
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

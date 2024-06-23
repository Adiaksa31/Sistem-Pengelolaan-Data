'use client'
import Link from "next/link";
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import AddPelanggan from "./addPelanggan";
import DeletePelanggan from "./deletePelanggan";
import ShowPelanggan from "./showPelanggan";
import UpdatePelanggan from "./updatePelanggan";
import Table from "../components/table";
import Aksi from "../components/aksi";
import { useState, useEffect } from 'react';
import token from "../components/token";

async function getPelanggans() {
  const res = await fetch('http://localhost:3000/api/pelanggan/get',{
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
  id_kelurahan: any,
  id_kecamatan: any,
  id_kabupaten: any,
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
  const reloadTable = async () => {
    try {
      const pelangganData = await getPelanggans();
      setPelanggans(pelangganData);
    } catch (error) {
      console.error('Error reloading table:', error);
    }
  };
  const tableData = {
    headers: ['No', 'Nama Pelanggan', 'Nomor Wa', 'Email', 'Jenis Kelamin', 'Agama', 'Alamat', 'Tanggal Lahir', 'Pekerjaan', 'Action'],
    rows: pelangganType.map((pelanggan, index) => [
      index + 1,
      pelanggan.nama,
      pelanggan.no_wa,
      pelanggan.email,
      pelanggan.jenis_kelamin,
      pelanggan.agama,
      `Kelurahan ${pelanggan.kelurahan.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}, Kecamatan ${pelanggan.kecamatan.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}, ${pelanggan.kabupaten.charAt(0).toUpperCase() + pelanggan.kabupaten.slice(1).toLowerCase()}`,
      new Date(pelanggan.tgl_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      pelanggan.pekerjaan.nama_pekerjaan,
      <div key={`aksi-${index}`} className="container mx-auto">
        <Aksi><ShowPelanggan pelanggan={pelanggan}/><UpdatePelanggan pelanggan={pelanggan} reloadTable={reloadTable}/> <DeletePelanggan pelanggan={pelanggan} reloadTable={reloadTable}/> </Aksi>
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
          
        <div className="flex flex-wrap items-center -mx-3 space-x-3">
        <div className="px-3 pr-3 md:pr-0 md:pb-0">
        <div className="flex space-x-1 items-center font-bold text-xs px-4 md:px-5 py-1.5 text-white rounded bg-green-600">
              <Link href="#">Unduh Excel</Link>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
          </div>
        </div>
        <div className="pr-3 md:pb-0">
              <AddPelanggan reloadTable={reloadTable}></AddPelanggan>
          </div>
        </div>
      </div>
      <div>
      <Table data={tableData} 
      />
    </div>     
    </div>
    </div>
  </>
  );
}

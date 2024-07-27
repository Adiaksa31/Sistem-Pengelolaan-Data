'use client'
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import AddCabang from "./addCabang";
import DeleteCabang from "./deleteCabang";
import UpdateCabang from "./updateCabang";
import Table from "../components/table";
import Aksi from "../components/aksi";
import token from "../components/token";

import { useState, useEffect } from 'react';

async function getCabangs() {
  const res = await fetch('http://103.84.207.76:3000/api/cabang/get',{
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

    fetchData();
  }, []);
  const reloadTable = async () => {
    try {
      const cabangData = await getCabangs();
      setCabangs(cabangData);
    } catch (error) {
      console.error('Error reloading table:', error);
    }
  };

  const tableData = {
    headers: ['No', 'Nama Cabang', 'Alamat', 'Nomor', 'Status', 'Action'],
    rows: cabangType.map((cabang, index) => 
      ({
        id: cabang.id.toString(),
        values: [
      index + 1,
      cabang.nama_cabang,
      cabang.alamat_cabang,
      cabang.nomor,
      cabang.status_cabang,
    
      <div key={`aksi-${index}`} className="mx-auto">
         <Aksi><UpdateCabang cabang={cabang} reloadTable={reloadTable}/><DeleteCabang cabang={cabang} reloadTable={reloadTable}/> </Aksi></div>
    ]
  })),
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
          <AddCabang reloadTable={reloadTable}/>
        </div>
      </div>
      <div>
      <Table data={tableData} />
      </div>
    </div>
    </div>
  </>
  );
}

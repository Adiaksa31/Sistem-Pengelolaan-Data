"use client";
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import AddJabatan from "./addJabatan";
import DeleteJabatan from "./deleteJabatan";
import UpdateJabatan from "./updateJabatan";
import Table from "../components/table";
import Aksi from "../components/aksi";
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

  const reloadTable = async () => {
    try {
      const posisiData = await getPosisis();
      setPosisis(posisiData);
    } catch (error) {
      console.error('Error reloading table:', error);
    }
  };

  const tableData = {
    headers: ['No', 'Nama Jabatan', 'Status', 'Action'],
    rows: posisiType.map((posisi, index) =>  ({
      id: posisi.id.toString(),
      values: [
      index + 1,
      posisi.nama_posisi,
      posisi.status,
    
      <div key={`aksi-${index}`} className="mx-auto">
         <Aksi>
         <UpdateJabatan posisi={posisi} reloadTable={reloadTable}/>
          <DeleteJabatan posisi={posisi} reloadTable={reloadTable}/> </Aksi>
        </div>
    ]
  })),
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
          <AddJabatan reloadTable={reloadTable}></AddJabatan>
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

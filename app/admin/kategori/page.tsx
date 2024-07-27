'use client'
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import AddKategori from "./addKategori";
import DeleteKategori from "./deleteKategori";
import UpdateKategori from "./updateKategori";
import Table from "../components/table";
import Aksi from "../components/aksi";
import { useState, useEffect } from 'react';
import token from "../components/token";

async function getKategoris() {
  const res = await fetch('http://103.84.207.76:3000/api/kategori/get',{
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
type Kategori = {
  id: number;
  nama: string;
  nama_kategori: string;
  status: string;
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

  const reloadTable = async () => {
    try {
      const kategoriData = await getKategoris();
      setKategoris(kategoriData);
    } catch (error) {
      console.error('Error reloading table:', error);
    }
  };

  const tableData = {
    headers: ['No', 'Nama Kategori', 'Status', 'Action'],
    rows: kategoriType.map((kategori, index) => ({
      id: kategori.id.toString(),
      values: [
      index + 1,
      kategori.nama_kategori,
      kategori.status_kategori,
    
      <div key={`aksi-${index}`} className="mx-auto">
        <Aksi><UpdateKategori kategori={kategori} reloadTable={reloadTable}/><DeleteKategori kategori={kategori} reloadTable={reloadTable} /> </Aksi>
      </div>
    ]
  })),
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
          <AddKategori reloadTable={reloadTable}/>
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

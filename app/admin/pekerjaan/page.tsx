'use client'
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import AddPekerjaan from "./addPekerjaan";
import UpdatePekerjaan from "./updatePekerjaan";
import DeletePekerjaan from "./deletePekerjaan";
import Table from "../components/table";
import Aksi from "../components/aksi";
import { useState, useEffect } from 'react';
import token from "../components/token";

async function getPekerjaans() {
  const res = await fetch('http://localhost:3000/api/pekerjaan/get',{
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
type Pekerjaan = {
  id: number;
  nama: string;
  nama_pekerjaan: string;
}

export default function Pekerjaan() {
  const [pekerjaans, setPekerjaans] = useState([]);
  const pekerjaanType = pekerjaans as Pekerjaan[];

  useEffect(() => {
    async function fetchData() {
      try {
        const pekerjaanData = await getPekerjaans();
        setPekerjaans(pekerjaanData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const reloadTable = async () => {
    try {
      const pekerjaanData = await getPekerjaans();
      setPekerjaans(pekerjaanData);
    } catch (error) {
      console.error('Error reloading table:', error);
    }
  };

  const tableData = {
    headers: ['No', 'Nama Pekerjaan', 'Action'],
    rows: pekerjaanType.map((pekerjaan, index) => [
      index + 1,
      pekerjaan.nama_pekerjaan,
    
      <div key={`aksi-${index}`} className="container mx-auto">
        <Aksi> 
          <UpdatePekerjaan pekerjaan={pekerjaan} reloadTable={reloadTable} />
          <DeletePekerjaan pekerjaan={pekerjaan} reloadTable={reloadTable} />
        </Aksi>
      </div>
    ]),
  };

  return (
    <>
      <NavAdmAts />
      <NavAdmBwh currentPath="/admin/pekerjaan"/>
    
      <div className="p-3 md:px-10">
        <div className="px-3 pb-3 bg-white shadow">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
            <div>
              <h1 className="font-black py-2 px-1 text-3xl">Pekerjaan</h1>
            </div>
            <label className="sr-only">Search</label>
            <div className="flex items-center space-x-3">
              <AddPekerjaan reloadTable={reloadTable} />
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

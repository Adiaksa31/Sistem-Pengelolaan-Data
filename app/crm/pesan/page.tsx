'use client'
import Link from "next/link";
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import AddPesan from "./addPesan";
import DeletePesan from "./deletePesan";
import ShowPesan from "./showPesan";
import UpdatePesan from "./updatePesan";
import Table from "../components/table";
import Aksi from "../components/aksi";
import { useState, useEffect } from 'react';
import token from "../components/token";
import DownloadExcel from "./downloadExcelPesan";

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
    fetchData();
  }, []);
  const reloadTable = async () => {
    try {
      const pesananData = await getPesanans();
      setPesanans(pesananData);
    } catch (error) {
      console.error('Error reloading table:', error);
    }
  };

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
        <div key={`aksi-${index}`} className="mx-auto">
          <Aksi><ShowPesan pesanan={pesanan}/><UpdatePesan pesanan={pesanan} reloadTable={reloadTable}/> <DeletePesan pesanan={pesanan} reloadTable={reloadTable}/> </Aksi>
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
       <div className="px-3 pr-3 md:pr-0 md:pb-0">
       <DownloadExcel data={pesanans} />
       </div>
        <div className="pr-3 md:pb-0">
           <AddPesan reloadTable={reloadTable}></AddPesan>  
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

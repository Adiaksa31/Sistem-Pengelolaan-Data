'use client'

import { SyntheticEvent, useState, useEffect } from "react";
import moment from "moment";
import BtnEditData from "../components/btnEditData";
import token from "../components/token";

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

  export default function UpdatePesan({ pesanan }: { pesanan: Pesanan }) {
    const [id, setId] = useState(pesanan.id);
    const [kategori_id, setKategori_id] = useState(pesanan.kategori.id);
    const [customer_id, setCustomer_id] = useState(pesanan.costumer.id);
    const [sumber, setSumber] = useState(pesanan.sumber);
    const [type_motor, setType_motor] = useState(pesanan.type_motor);
    const [warna_motor, setWarna_motor] = useState(pesanan.warna_motor);
    const [model_motor, setModel_motor] = useState(pesanan.model_motor);
    const [jenis_pembayaran, setJenis_pembayaran] = useState(pesanan.jenis_pembayaran);
    const [jenis_service, setJenis_service] = useState(pesanan.jenis_service);
    const [jadwal_service, setJadwal_service] = useState(pesanan.jadwal_service);
    const [jenis_sparepart, setJenis_sparepart] = useState(pesanan.jenis_sparepart);
    const [nama_sparepart, setNama_sparepart] = useState(pesanan.nama_sparepart);
    const [jenis_keluhan, setJenis_keluhan] = useState(pesanan.jenis_keluhan);
    const [jenis_informasi, setJenis_informasi] = useState(pesanan.jenis_informasi);
    const [keterangan, setKeterangan] = useState(pesanan.keterangan);
    const [cabang_id, setCabang_id] = useState(pesanan.cabang.id);
    const [crm_id, setCrm_id] = useState(pesanan.crm.id);
    const [tujuan_user, setTujuan_user] = useState(pesanan.tujuan_user.id);
    const [status_kontak, setStatus_kontak] = useState(pesanan.status_kontak);
    const [query, setQuery] = useState('');
    const [error, setError] = useState<string | null>(null); 
  
    async function handelUpdatePesan(e: SyntheticEvent) {
      e.preventDefault();
      try {
        const preparedData = {
          id,
          kategori_id,
          customer_id,
          sumber,
          type_motor,
          warna_motor,
          model_motor,
          jenis_pembayaran,
          jenis_service,
          jadwal_service,
          jenis_sparepart,
          nama_sparepart,
          jenis_keluhan,
          jenis_informasi,
          keterangan,
          cabang_id,
          crm_id,
          tujuan_user,
          status_kontak,
        };

        const response = await fetch('http://localhost:3000/api/pesanan/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(preparedData),
        });
  
        if (!response.ok) {
       
          const errorData = await response.json(); 
          setError(`Gagal memperbarui data: ${errorData.message || 'Unknown error'}`);
          throw new Error(errorData.message || 'Unknown error'); 
        }
  
        console.log('Data berhasil diperbarui');
        setError(null); 
        window.location.reload(); 
        return response;
        
      } catch (error) {
        console.error('Error:', error as Error);
        setError((error as Error).message || 'Unknown error'); 
      }
    }
    async function getUsers() {
      const res = await fetch('http://localhost:3000/api/user/get',{
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
    async function getKategoris() {
      const res = await fetch('http://localhost:3000/api/kategori/get',{
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
    async function getCabangs() {
      const res = await fetch('http://localhost:3000/api/cabang/get',{
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
    type User = {
      id: number;
      nama: string;
      email: string;
      nomor: number;
      password: any;
      posisi: any;
      cabang: any;
      status: string;
    }
    
    type Cabang = {
      id: number;
      nama_cabang: string;
      status_cabang: string;
      alamat_cabang: string;
      nomor: number;
    }
    type Kategori = {
      id: number;
      nama_kategori: string;
      status: string;
    }
    
    const [cabangs, setCabangs] = useState([]);
    const cabangType = cabangs as Cabang[];
    const [kategoris, setKategoris] = useState([]);
    const kategoriType = kategoris as Kategori[];
    const [users, setUsers] = useState([]);
    const userType = users as User[];
  
    useEffect(() => {
      async function fetchData() {
        try {
          const cabangData = await getCabangs();
          setCabangs(cabangData);
          const kategoriData = await getKategoris();
          setKategoris(kategoriData);
          const userData = await getUsers();
          setUsers(userData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData();
    }, []);  
    const modalContent = (
        <div className="p-4">
          <h1 className="text-center font-bold text-xl">Edit Data Pesan/Kontak {pesanan.costumer.nama}</h1>
          <br />
          <form onSubmit={handelUpdatePesan} className="w-full max-w-lg">
          <div className="flex-wrap -mx-3 mb-6 hidden">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nama..." 
                    value={customer_id}
                    onChange={e=>setCustomer_id(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Sumber Pesan/Kontak
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                   value={sumber}
                   onChange={e=>setSumber(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Sumber Pesan/Kontak --</option>
                    <option>Wa</option>
                    <option>Telepon</option>
                    <option>Website</option>
                    <option>Onsite</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
            </div>
            </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Keterangan
                    </label>
                    <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" placeholder="Masukkan Nomor..." 
                     value={keterangan}
                     onChange={e=>setKeterangan(e.target.value)}
                     />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Cabang
                    </label>
                    <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={cabang_id}
                       onChange={e=>setCabang_id(e.target.value)} >
                      <option selected disabled>-- Pilih Cabang --</option>
                      {cabangType.map(cabang => (
                          <option key={cabang.id} value={cabang.id}>
                            {cabang.nama_cabang}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Kategori
                    </label>
                    <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={kategori_id}
                       onChange={e=>setKategori_id(e.target.value)}
                       >
                      <option selected disabled>-- Pilih Kategori --</option>
                      {kategoriType.map(kategori => (
                          <option key={kategori.id} value={kategori.id}>
                            {kategori.nama_kategori}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                  {kategori_id && kategoriType.find(k => k.id === parseInt(kategori_id))?.nama_kategori === 'Keluhan' && (
                     <div className="w-full px-10 mt-3">
                     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                       Jenis Keluhan
                     </label>
                     <div className="relative">
                   <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                    value={jenis_keluhan}
                    onChange={e=>setJenis_keluhan(e.target.value)}>
                   <option selected value="" disabled >-- Pilih Jenis Keluhan --</option>
                     <option>Keluhan Sepeda Motor</option>
                     <option>Keluhan Pelayanan</option>
                   </select>
                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                     <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                   </div>
                 </div>
                 </div>
                  )}
                   {kategori_id && kategoriType.find(k => k.id === parseInt(kategori_id))?.nama_kategori === 'Informasi' && (
                    <div className="w-full px-10 mt-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Jenis Informasi
                    </label>
                    <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                   value={jenis_informasi}
                   onChange={e=>setJenis_informasi(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Jenis Informasi --</option>
                    <option>STNK & BPKB</option>
                    <option>Promo</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                </div>
                  )}
                     {kategori_id && kategoriType.find(k => k.id === parseInt(kategori_id))?.nama_kategori === 'Sperpart' && (
                     <div className="w-full px-10 mt-3">
                     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                       Jenis Sperpart
                     </label>
                     <div className="relative">
                   <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                    value={jenis_sparepart}
                    onChange={e=>setJenis_sparepart(e.target.value)}>
                   <option selected value="" disabled >-- Pilih Jenis Sperpart --</option>
                     <option>Body Motor</option>
                     <option>Ban</option>
                   </select>
                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                     <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                   </div>
                 </div>
                 </div>
                  )}

                    {kategori_id && kategoriType.find(k => k.id === parseInt(kategori_id))?.nama_kategori === 'Prospek Sale' && (
                       <div className="flex flex-wrap -mx-3">
                       <div className="w-full px-10 mt-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Jenis Motor
                        </label>
                        <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={type_motor}
                       onChange={e=>setType_motor(e.target.value)}>
                      <option selected value="" disabled >-- Pilih Jenis Motor --</option>
                        <option>Vario</option>
                        <option>Beat</option>
                        <option>Pcx</option>
                        <option>Steillo</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    </div>
                    <div className="w-full px-10 mt-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Warna Motor
                        </label>
                        <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={warna_motor}
                       onChange={e=>setWarna_motor(e.target.value)}>
                      <option selected value="" disabled >-- Pilih Warna Motor --</option>
                        <option>Hitam</option>
                        <option>Putih</option>
                        <option>Biru</option>
                        <option>Merah</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    </div>
                    <div className="w-full px-10 mt-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Cc Motor
                    </label>
                    <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                   value={model_motor}
                   onChange={e=>setModel_motor(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Cc Motor --</option>
                    <option>110</option>
                    <option>125</option>
                    <option>150</option>
                    <option>160</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                  </div>
                  <div className="w-full px-10 mt-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Jenis Pembayaran
                    </label>
                    <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                   value={jenis_pembayaran}
                   onChange={e=>setJenis_pembayaran(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Jenis Pembayaran --</option>
                    <option>Kredit</option>
                    <option>Cash</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                  </div>
                    </div>
                  )}

                {kategori_id && kategoriType.find(k => k.id === parseInt(kategori_id))?.nama_kategori === 'Booking Service' && (
                 <div className="flex flex-wrap -mx-3">
                 <div className="w-full px-10 mt-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Jenis Service
                    </label>
                    <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                   value={jenis_service}
                   onChange={e=>setJenis_service(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Jenis Service --</option>
                    <option>Servis Besar</option>
                    <option>Servis Kecil</option>
                    <option>Ganti Oli</option>
                    <option>Ganti Sparepart</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                  </div>
                  <div className="w-full px-10 mt-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Jenis Motor
                    </label>
                    <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                   value={type_motor}
                   onChange={e=>setType_motor(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Jenis Motor --</option>
                    <option>Vario</option>
                    <option>Beat</option>
                    <option>Pcx</option>
                    <option>Steillo</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                  </div>
                  <div className="w-full px-10 mt-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Cc Motor
                    </label>
                    <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                   value={model_motor}
                   onChange={e=>setModel_motor(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Cc Motor --</option>
                    <option>110</option>
                    <option>125</option>
                    <option>150</option>
                    <option>160</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                  </div>
                  <div className="w-full px-10 mt-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Jadwal Service
                    </label>
                    <div className="relative">
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="date" placeholder="Tanggal lahir..." 
                 value={jadwal_service}
                 onChange={e=>setJadwal_service(Number(e.target.value))}/>
                </div>
                  </div>
                  </div>
                )}
                </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Admin CRM
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                   value={crm_id}
                   onChange={e=>setCrm_id(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Crm --</option>
                  {userType.filter(user => user.posisi && user.posisi.nama_posisi === 'Crm').map(filteredUser => (
          <option key={filteredUser.id} value={filteredUser.id}>
            {filteredUser.nama}
          </option>
        ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Tujuan User
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                  value={tujuan_user}
                  onChange={e=>setTujuan_user(e.target.value)}>
                  <option selected  disabled >-- Pilih Tujuan User --</option>
                  {userType.map(user => (
                          <option key={user.id} value={user.id}>
                            {user.nama}
                          </option>
                        ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Status
                    </label>
                    <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={status_kontak}
                       onChange={e=>setStatus_kontak(e.target.value)} >
                      <option disabled selected>-- Pilih Status --</option>
                        <option>Pending</option>
                        <option>Proses</option>
                        <option>Selesai</option>
                        <option>Batal</option>
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
    return (
        <>
        <BtnEditData
           content={modalContent} formSubmitEdt={handelUpdatePesan}
          ></BtnEditData>
        </>
    )
}
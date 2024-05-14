'use client'
import { SyntheticEvent, useState, useEffect, ChangeEvent } from "react";
import BtnData from "../components/btnData";
import token from "../components/token";
import Link from 'next/link';

export default function AddPesan() {
  const [kategori_id, setKategori_id] = useState("");
  const [customer_id, setCustomer_id] = useState("");
  const [sumber, setSumber] = useState("");
  const [type_motor, setType_motor] = useState(null);
  const [warna_motor, setWarna_motor] = useState(null);
  const [model_motor, setModel_motor] = useState(null);
  const [jenis_pembayaran, setJenis_pembayaran] = useState(null);
  const [jenis_service, setJenis_service] = useState(null);
  const [jadwal_service, setJadwal_service] = useState(null);
  const [jenis_sparepart, setJenis_sparepart] = useState(null);
  const [nama_sparepart, setNama_sparepart] = useState(null);
  const [jenis_keluhan, setJenis_keluhan] = useState(null);
  const [jenis_informasi, setJenis_informasi] = useState(null);
  const [keterangan, setKeterangan] = useState("");
  const [cabang_id, setCabang_id] = useState("");
  const [crm_id, setCrm_id] = useState("");
  const [tujuan_user, setTujuan_user] = useState("");
  const [status_kontak, setStatus_kontak] = useState("pending");
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<boolean>(false);


  async function addPesan(e: SyntheticEvent) {
    e.preventDefault();
  
    try {
      const preparedData = {
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
  
      const response = await fetch('http://localhost:3000/api/pesanan/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(preparedData),
      });
  
      if (!response.ok) {
  
        const errorData = await response.json();
        throw new Error(`Gagal menambahkan data: ${errorData.message || 'Unknown error'}`);
      }
  
      console.log('Data berhasil ditambahkan');
      window.location.reload();
      return response;
    } catch (error) {
      console.error('Error:', error as Error);
    }
  }  

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
    kelurahan: string;
    kecamatan: string;
    kabupaten: string;
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
  const [pelanggans, setPelanggans] = useState([]);
  const pelangganType = pelanggans as Pelanggan[];
  const [cabangs, setCabangs] = useState([]);
  const cabangType = cabangs as Cabang[];
  const [kategoris, setKategoris] = useState([]);
  const kategoriType = kategoris as Kategori[];

  useEffect(() => {
    async function fetchData() {
      try {
        const pelangganData = await getPelanggans();
        setPelanggans(pelangganData);
        const cabangData = await getCabangs();
        setCabangs(cabangData);
        const kategoriData = await getKategoris();
        setKategoris(kategoriData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);  
  const filteredPelanggan = pelangganType.filter(pelanggan =>
    pelanggan.no_wa.toString().includes(query)
  );
  
  const handleSelect = (id: number, no_wa: number, nama: string) => {
    setCustomer_id(id.toString());
    setQuery(`${no_wa} - ${nama}`.toString());
    setSelected(true);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelected(false); 
  };
    const modalContent = (
        <div className="p-4">
          <h1 className="text-center font-bold text-xl">Tambah Data Pelanggan</h1>
          <br />
          <form onSubmit={addPesan} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Nomor Wa Pelanggan
        </label>
        <input
          type="text"
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          placeholder="Masukkan Nomor Wa Pelanggan"
          value={query}
          onChange={handleChange}
         
        />
        {query && !selected && (
          <div className="relative">
            {filteredPelanggan.length > 0 ? (
              <ul className="absolute z-10 bg-white border border-gray-300 w-full rounded">
                {filteredPelanggan.map(pelanggan => (
                  <li
                    key={pelanggan.id}
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(pelanggan.id, pelanggan.no_wa, pelanggan.nama)}
                  >
                    {pelanggan.no_wa} - {pelanggan.nama}
                  </li>
                ))}
              </ul>
            ) : (
             <span>Tidak ada data silakan <Link className="text-green-600" href="/crm/pelanggan">
               Tambah Data
           </Link></span>
            )}
          </div>
        )}
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
                <div className="flex flex-wrap -mx-3 mb-6">
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
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Kategori
                    </label>
                    <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={kategori_id}
                       onChange={e=>setKategori_id(e.target.value)}
                       >
                      <option selected value="" disabled>-- Pilih Kategori --</option>
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
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Cabang
                    </label>
                    <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={cabang_id}
                       onChange={e=>setCabang_id(e.target.value)} >
                      <option selected value="" disabled>-- Pilih Cabang --</option>
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
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Admin CRM
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                   value={crm_id}
                   onChange={e=>setCrm_id(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Crm --</option>
                    <option>1</option>
                    <option>2</option>
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
                  Tujuan User
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                  value={tujuan_user}
                  onChange={e=>setTujuan_user(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Tujuan User --</option>
                    <option>1</option>
                    <option>2</option>
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
        <BtnData
           content={modalContent} formSubmit={addPesan}
          ></BtnData>
        </>
    )
}
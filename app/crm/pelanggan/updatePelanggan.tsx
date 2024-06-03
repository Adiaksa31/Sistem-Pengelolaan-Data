'use client'

import { SyntheticEvent, useState, useEffect } from "react";
import moment from "moment";
import BtnEditData from "../components/btnEditData";
import token from "../components/token";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

type Pelanggan = {
    id: number;
    nama: string;
    email: string;
    no_wa: number;
    tgl_lahir: any;
    agama: string;
    pekerjaan: any;
    id_pekerjaan: any;
    jenis_kelamin: string;
    kelurahan: string;
    kecamatan: string;
    kabupaten: string;
  }

  export default function UpdatePelanggan({ pelanggan }: { pelanggan: Pelanggan }) {
    const [id, setId] = useState(pelanggan.id);
    const [nama, setNama] = useState(pelanggan.nama);
    const [email, setEmail] = useState(pelanggan.email);
    const [no_wa, setNo_wa] = useState(pelanggan.no_wa);
    const [tgl_lahir, setTgl_lahir] = useState(pelanggan.tgl_lahir);
    const [agama, setAgama] = useState(pelanggan.agama);
    const [id_pekerjaan, setId_pekerjaan] = useState(pelanggan.pekerjaan.id_pekerjaan);
    const [jenis_kelamin, setJenis_kelamin] = useState(pelanggan.jenis_kelamin);
    const [kelurahan, setKelurahan] = useState(pelanggan.kelurahan);
    const [kecamatan, setKecamatan] = useState(pelanggan.kecamatan);
    const [kabupaten, setKabupaten] = useState(pelanggan.kabupaten);
    const [kelurahanName, setKelurahanName] = useState("");
    const [kecamatanName, setKecamatanName] = useState("");
    const [kabupatenName, setKabupatenName] = useState("");
    const [error, setError] = useState<string | null>(null); 
    const router = useRouter();
  
    async function handelUpdatePelanggan(e: SyntheticEvent) {
      e.preventDefault();
      try {
        const preparedData = {
          id,
          nama,
          email,
          no_wa,
          tgl_lahir,
          agama,
          id_pekerjaan,
          jenis_kelamin,
          kelurahan: kelurahanName,
          kecamatan: kecamatanName,
          kabupaten: kabupatenName,
        };

        const response = await fetch('http://localhost:3000/api/pelanggan/update', {
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
  
        toast({ title: `Data ${pelanggan.nama} berhasil diperbaharui`, variant: 'berhasil' });
        setError(null); 
        router.refresh(); 
        return response;
        
      } catch (error) {
        console.error('Error:', error as Error);
        setError((error as Error).message || 'Unknown error'); 
      }
    }
    async function getPekerjaans() {
      const res = await fetch('http://localhost:3000/api/pekerjaan/get',{
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

    
  async function getKabupaten() {
    try {
        const response = await fetch('/api/region/kabupaten', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const provinces = await response.json();
        console.log("Parsed JSON:", provinces);

        return provinces;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
  }

  async function getKecamatan(id: string) {
    try {
      const response = await fetch(`/api/region/kecamatan?id=${id}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const provinces = await response.json();
      console.log("Parsed JSON:", provinces);
  
      return provinces;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
 
  async function getKelurahan(id: string) {
    try {
      const response = await fetch(`/api/region/kelurahan?id=${id}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const provinces = await response.json();
      console.log("Parsed JSON:", provinces);
  
      return provinces;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  type Region = {
    id: number;
    name: string;
  }
  
    type Pekerjaan = {
      id: number;
      nama_pekerjaan: string;
    }

    const [kabupatens, setKabupatens] = useState([]);
    const [kecamatans, setKecamatans] = useState([]);
    const [kelurahans, setKelurahans] = useState([]);
  
    const kabupatenType = kabupatens as Region[];
    const kecamatanType = kecamatans as Region[];
    const kelurahanType = kelurahans as Region[];
  
    const [pekerjaans, setPekerjaans] = useState([]);
    const pekerjaanType = pekerjaans as Pekerjaan[];
    useEffect(() => {
      async function fetchData() {
        try {
          const pekerjaanData = await getPekerjaans();
          setPekerjaans(pekerjaanData);
          const kabupatenData = await getKabupaten();
          setKabupatens(kabupatenData);
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    }, []);

    
  useEffect(() => {
    async function fetchKecamatanData() {
      if (kabupaten) {
        try {
          const kecamatanData = await getKecamatan(kabupaten);
          setKecamatans(kecamatanData);
          
          const selectedKabupaten = kabupatenType.find(item => item.id.toString() === kabupaten);
          setKabupatenName(selectedKabupaten ? selectedKabupaten.name : "");

        } catch (error) {
          console.error('Error fetching kecamatan data:', error);
        }
      }
    }
    fetchKecamatanData();
  }, [kabupaten]);

  useEffect(() => {
    async function fetchKelurahanData() {
      if (kecamatan) {
        try {
          const kelurahanData = await getKelurahan(kecamatan);
          setKelurahans(kelurahanData);
          
          const selectedKecamatan = kecamatanType.find(item => item.id.toString() === kecamatan);
          setKecamatanName(selectedKecamatan ? selectedKecamatan.name : "");

        } catch (error) {
          console.error('Error fetching kelurahan data:', error);
        }
      }
    }
    fetchKelurahanData();
  }, [kecamatan]);

  useEffect(() => {
    const selectedKelurahan = kelurahanType.find(item => item.id.toString() === kelurahan);
    setKelurahanName(selectedKelurahan ? selectedKelurahan.name : "");
  }, [kelurahan]);

    const modalContent = (
        <div className="p-4">
          <h1 className="text-center font-bold text-xl">Edit Data {pelanggan.nama}</h1>
          <br />
          <form onSubmit={handelUpdatePelanggan} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nama Pelanggan
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nama..." 
                    value={nama}
                    onChange={e=>setNama(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Email
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Email..." 
                     value={email}
                     onChange={e=>setEmail(e.target.value)}
                     />
                    <p className="text-red-500 text-xs italic">Username sudah digunakan.</p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nomor Whatsapp
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nomor..." 
                     value={no_wa}
                     onChange={e=>setNo_wa(Number(e.target.value))}
                     />
                    <p className="text-red-500 text-xs italic">Username sudah digunakan.</p>
                  </div>
                </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Jenis Kelamin
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                   value={jenis_kelamin}
                   onChange={e=>setJenis_kelamin(e.target.value)}>
                  <option selected disabled >-- Pilih Jenis Kelamin --</option>
                    <option>Laki-laki</option>
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
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                  value={agama}
                  onChange={e=>setAgama(e.target.value)}>
                  <option selected disabled >-- Pilih Agama --</option>
                    <option>Hindu</option>
                    <option>Islam</option>
                    <option>Budha</option>
                    <option>Kristen</option>
                    <option>Katolik</option>
                    <option>Khonghucu</option>
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
                  Tanggal Lahir
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="date" placeholder="Tanggal lahir..." 
                 value={moment(tgl_lahir).format('YYYY-MM-DD')}
                 onChange={e=>setTgl_lahir(e.target.value)}/>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Kabupaten
                    </label>
                    <div className="relative">
                    <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        value={kabupaten}
                        onChange={e => setKabupaten(e.target.value)}
                      >
                        <option selected disabled>Pilih Kabupaten</option>
                        {kabupatenType.map((region) => (
                          <option key={region.id} value={region.id}>{region.name}</option>
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
                      Kecamatan
                    </label>
                    <div className="relative">
                    <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        value={kecamatan}
                        onChange={e => setKecamatan(e.target.value)}
                      >
                        <option selected disabled >Pilih Kecamatan</option>
                        {kecamatanType.map((region) => (
                          <option key={region.id} value={region.id}>{region.name}</option>
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
                      Kelurahan
                    </label>
                    <div className="relative">
                    <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        value={kelurahan}
                        onChange={e => setKelurahan(e.target.value)}
                      >
                        <option selected disabled>Pilih Kelurahan</option>
                        {kelurahanType.map((region) => (
                          <option key={region.id} value={region.id}>{region.name}</option>
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
                      Pekerjaan
                    </label>
                    <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={id_pekerjaan}
                       onChange={e=>setId_pekerjaan(e.target.value)}
                       >
                      <option disabled selected>-- Pilih Pekerjaan --</option>
                      {pekerjaanType.map(pekerjaan => (
                          <option key={pekerjaan.id} value={pekerjaan.id}>
                            {pekerjaan.nama_pekerjaan}
                          </option>
                        ))}
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
           content={modalContent} formSubmitEdt={handelUpdatePelanggan}
          ></BtnEditData>
        </>
    )
}
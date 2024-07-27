'use client'
import { SyntheticEvent, useState, useEffect } from "react";
import BtnData from "../components/btnData";
import token from "../components/token";
import { toast } from "@/components/ui/use-toast";
import { HiExclamationCircle } from "react-icons/hi";
const fetch2 = require('node-fetch');
interface AddPelangganProps {
  reloadTable: () => void;
}

export default function AddPelanggan({ reloadTable }: AddPelangganProps) {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [no_wa, setNo_wa] = useState("");
  const [tgl_lahir, setTgl_lahir] = useState("");
  const [agama, setAgama] = useState("");
  const [id_pekerjaan, setId_pekerjaan] = useState("");
  const [jenis_kelamin, setJenis_kelamin] = useState("");
  const [id_kelurahan, setIdKelurahan] = useState("");
  const [id_kecamatan, setIdKecamatan] = useState("");
  const [id_kabupaten, setIdKabupaten] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kelurahanName, setKelurahanName] = useState("");
  const [kecamatanName, setKecamatanName] = useState("");
  const [kabupatenName, setKabupatenName] = useState("");
  const [errorNama, setErrorNama] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorNo_wa, setErrorNo_wa] = useState("");
  const [errorTgl_lahir, setErrorTgl_lahir] = useState("");
  const [errorAgama, setErrorAgama] = useState("");
  const [errorPekerjaanId, setErrorPekerjaanId] = useState("");
  const [errorJenis_kelamin, setErrorJenis_kelamin] = useState("");
  const [errorKelurahan, setErrorKelurahan] = useState("");
  const [errorKecamatan, setErrorKecamatan] = useState("");
  const [errorKabupaten, setErrorKabupaten] = useState("");

  const resetForm = () => {
    setNama("");
    setEmail("");
    setNo_wa("");
    setTgl_lahir("");
    setAgama("");
    setId_pekerjaan("");
    setJenis_kelamin("");
    setIdKelurahan("");
    setIdKecamatan("");
    setIdKabupaten("");
    setKelurahan("");
    setKecamatan("");
    setKabupaten("");
    setKelurahanName("");
    setKecamatanName("");
    setKabupatenName("");
    setErrorNama("");
    setErrorEmail("");
    setErrorNo_wa("");
    setErrorTgl_lahir("");
    setErrorAgama("");
    setErrorPekerjaanId("");
    setErrorJenis_kelamin("");
    setErrorKelurahan("");
    setErrorKecamatan("");
    setErrorKabupaten("");
  };

  async function addPelanggan(e: SyntheticEvent) {
    e.preventDefault();

    if (!nama) {
      setErrorNama("Nama Pelanggan tidak boleh kosong");
  } else {
      setErrorNama("");
  }
  if (!email) {
    setErrorEmail("Email tidak boleh kosong");
    } else {
      setErrorEmail("");
      }
  if (!no_wa) {
    setErrorNo_wa("No WA tidak boleh kosong");
    } else {
      setErrorNo_wa("");
      }
  if (!tgl_lahir) {
    setErrorTgl_lahir("Tanggal Lahir tidak boleh kosong");
    } else {
      setErrorTgl_lahir("");
      }
  if (!agama) {
    setErrorAgama("Agama tidak boleh kosong");
    } else {
      setErrorAgama("");
      }
  if (!jenis_kelamin) {
    setErrorJenis_kelamin("Jenis Kelamin tidak boleh kosong");
    } else {
      setErrorJenis_kelamin("");
      }
  if (!kelurahan) {
    setErrorKelurahan("Kelurahan tidak boleh kosong");
    } else {
      setErrorKelurahan("");
      }
if (!kecamatan) {
  setErrorKecamatan("Kecamatan tidak boleh kosong");
  } else {
    setErrorKecamatan("");
    }
  if (!kabupaten) {
    setErrorKabupaten("Kabupaten tidak boleh kosong");
    } else {
      setErrorKabupaten("");
      }
  if (!id_pekerjaan) {
    setErrorPekerjaanId("Pekerjaan tidak boleh kosong");
    return;
    } else {
      setErrorPekerjaanId("");
      }

    try {
      const preparedData = {
        nama,
        email,
        no_wa,
        tgl_lahir,
        agama,
        id_pekerjaan,
        jenis_kelamin,
        id_kelurahan,
        id_kecamatan,
        id_kabupaten,
        kelurahan: kelurahanName,
        kecamatan: kecamatanName,
        kabupaten: kabupatenName,
      };

      const response = await fetch('http://103.84.207.76:3000/api/pelanggan/store', {
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

      toast({ title: 'Data berhasil ditambahkan', variant: 'berhasil' });
      reloadTable();
      return response;
    } catch (error) {
      console.error('Error:', error as Error);
    }
  }

  async function getPekerjaans() {
    const res = await fetch('http://103.84.207.76:3000/api/pekerjaan/get', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }).then(response => response.json())
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
          setIdKabupaten(kabupaten); // Set the id_kabupaten state

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
          setIdKecamatan(kecamatan); // Set the id_kecamatan state

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
    setIdKelurahan(kelurahan); // Set the id_kelurahan state
  }, [kelurahan]);
    const modalContent = (
        <div className="p-4">
          <h1 className="text-center font-bold text-xl">Tambah Data Pelanggan</h1>
          <br />
          <form onSubmit={addPelanggan} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nama Pelanggan
                    </label>
                    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorNama ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-first-name" type="text" placeholder="Masukkan Nama..." 
                    value={nama}
                    onChange={e=>setNama(e.target.value)}
                    />
                    {errorNama && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorNama}</p>}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Email
                    </label>
                    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorEmail ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-first-name" type="text" placeholder="Masukkan Email..." 
                     value={email}
                     onChange={e=>setEmail(e.target.value)}
                     />
                     {errorEmail && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorEmail}</p>}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nomor Whatsapp
                    </label>
                    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorNo_wa ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-first-name" type="text" placeholder="Masukkan Nomor..." 
                     value={no_wa}
                     onChange={e=>setNo_wa(e.target.value)}
                     />
                     {errorNo_wa && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorNo_wa}</p>}
                  </div>
                </div>
            <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Jenis Kelamin
                </label>
                <div className="relative">
                  <select className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorJenis_kelamin ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-state"
                   value={jenis_kelamin}
                   onChange={e=>setJenis_kelamin(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Jenis Kelamin --</option>
                    <option>Laki-laki</option>
                    <option>Perempuan</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                {errorJenis_kelamin && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorJenis_kelamin}</p>}
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Agama
                </label>
                <div className="relative">
                  <select className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorAgama ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-state"
                  value={agama}
                  onChange={e=>setAgama(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Agama --</option>
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
                {errorAgama && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorAgama}</p>}
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Tanggal Lahir
                </label>
                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorTgl_lahir ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-first-name" type="date" placeholder="Tanggal lahir..." 
                 value={tgl_lahir}
                 onChange={e=>setTgl_lahir(e.target.value)}/>
                  {errorTgl_lahir && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorTgl_lahir}</p>}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Kabupaten
                    </label>
                    <div className="relative">
                    <select
                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorKabupaten ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                        id="grid-state"
                        value={kabupaten}
                        onChange={e => setKabupaten(e.target.value)}
                      >
                        <option value="">Pilih Kabupaten</option>
                        {kabupatenType.map((region) => (
                          <option key={region.id} value={region.id}>{region.name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    {errorKabupaten && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorKabupaten}</p>}
                  </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Kecamatan
                    </label>
                    <div className="relative">
                    <select
                      className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorKecamatan ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                      id="grid-state"
                      value={kecamatan}
                      onChange={e => setKecamatan(e.target.value)}
                    >
                      <option value="">Pilih Kecamatan</option>
                      {kecamatanType.map((region) => (
                        <option key={region.id} value={region.id}>{region.name}</option>
                      ))}
                    </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    {errorKecamatan && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorKecamatan}</p>}
                  </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Kelurahan
                    </label>
                    <div className="relative">
                    <select
                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorKelurahan ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                        id="grid-state"
                        value={kelurahan}
                        onChange={e => setKelurahan(e.target.value)}
                      >
                        <option value="">Pilih Kelurahan</option>
                        {kelurahanType.map((region) => (
                          <option key={region.id} value={region.id}>{region.name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    {errorKelurahan && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorKelurahan}</p>}
                  </div>
                </div>
            <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Pekerjaan
                </label>
                <div className="relative">
                  <select className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorPekerjaanId ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-state"
                   value={id_pekerjaan}
                   onChange={e=>setId_pekerjaan(e.target.value)}>
                  <option disabled value="" selected>-- Pilih Pekerjaan --</option>
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
                {errorPekerjaanId && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorPekerjaanId}</p>}
            </div>
            </div>
         </form>
        </div>
      );
    return (
        <>
        <BtnData
           content={modalContent} formSubmit={addPelanggan} onClose={resetForm}
          ></BtnData>
        </>
    )
}
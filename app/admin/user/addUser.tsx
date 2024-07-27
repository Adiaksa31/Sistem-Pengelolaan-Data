'use client'
import { SyntheticEvent, useState, useEffect } from "react";
import BtnData from "../components/btnData";
import token from "../components/token";
import { toast } from "@/components/ui/use-toast";
import { HiExclamationCircle } from "react-icons/hi";


interface AddUserProps {
  reloadTable: () => void;
}

export default function AddUser({ reloadTable }: AddUserProps) {

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nomor, setNomor] = useState("");
  const [password, setPassword] = useState("");
  const [posisi_id, setPosisi_id] = useState("");
  const [cabang_id, setCabang_id] = useState("");
  const [errorNama, setErrorNama] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorNomor, setErrorNomor] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPosisi, setErrorPosisi] = useState("");
  const [errorCabang, setErrorCabang] = useState("");

  const resetForm = () => {
    setNama("");
    setEmail("");
    setNomor("");
    setPassword("");
    setPosisi_id("");
    setCabang_id("");
  };
  
  async function addUser(e: SyntheticEvent) {
    e.preventDefault();
  
    if (!nama) {
      setErrorNama("Nama tidak boleh kosong");
  } else {
      setErrorNama("");
  }
  if (!email) {
      setErrorEmail("Email tidak boleh kosong"); 
  } else {
      setErrorEmail("");
  }
  if (!nomor) {
      setErrorNomor("Nomor tidak boleh kosong");
  } else {
      setErrorNomor("");
  }
  if (!password) {
    setErrorPassword("Password tidak boleh kosong");
    } else {
      setErrorPassword("");
      }
  if (!posisi_id) {
    setErrorPosisi("Posisi tidak boleh kosong");
    } else {
      setErrorPosisi("");
      }
  if (!cabang_id) {
    setErrorCabang("Cabang tidak boleh kosong");
    return;
    } else {
      setErrorCabang("");
      }  

    try {
      const preparedData = {
        nama,
        email,
        nomor,
        password,
        posisi_id,
        cabang_id,
      };
      const response = await fetch('http://localhost:3000/api/user/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(preparedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
      if (errorData.message.includes('Email already exist')) {
        setErrorEmail("Email sudah terdaftar");
        throw new Error(`Gagal menambahkan data: ${errorData.message || 'Unknown error'}`);
      } else {
        throw new Error(`Gagal menambahkan data: ${errorData.message || 'Unknown error'}`);
      }
      }
  
     toast({ title: 'Data berhasil ditambahkan', variant: 'berhasil'});
     reloadTable();
      return response;
    } catch (error) {
      console.error('Error:', error as Error);
    }
  }  


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
  type Cabang = {
    id: number;
    nama_cabang: string;
    status_cabang: string;
    alamat_cabang: string;
    nomor: number;
  }
  type Posisi = {
    id: number;
    nama_posisi: string;
    status: string;
  }

  const [cabangs, setCabangs] = useState([]);
  const cabangType = cabangs as Cabang[];
  const [posisis, setPosisis] = useState([]);
  const posisiType = posisis as Posisi[];
  useEffect(() => {
    async function fetchData() {
      try {
        const cabangData = await getCabangs();
        setCabangs(cabangData);
        const posisiData = await getPosisis();
        setPosisis(posisiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);  
  const handleNomorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { 
      setNomor(value);
      setErrorNomor("");
    } else {
      setErrorNomor("Nomor hanya boleh berisi angka");
    }
  };
    const modalContent = (
        <div className="p-4">
          <h1 className="text-center font-bold text-xl">Tambah Data User</h1>
          <br />
          <form onSubmit={addUser} className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nama
                    </label>
                    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorNama ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-first-name" type="text" placeholder="Masukkan Nama..." 
                    value={nama}
                    autoComplete="off"
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
                    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorEmail ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-email" type="text" placeholder="Masukkan Email..." 
                      value={email}
                      autoComplete="off"
                      onChange={e => setEmail(e.target.value)}
                    />
                    {errorEmail && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorEmail}</p>}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nomor
                    </label>
                    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorNomor ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-nomor" type="text" placeholder="Masukkan Nomor..." 
                      value={nomor}
                      autoComplete="off"
                      onChange={handleNomorChange}
                    />
                    {errorNomor && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorNomor}</p>}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                      Password
                    </label>
                    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorPassword ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-password" type="password" placeholder="******************" 
                     value={password}
                     autoComplete="off"
                     onChange={e=>setPassword(e.target.value)}
                    />
                    {errorPassword && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorPassword}</p>}
                    <p className="flex items-center text-gray-600 text-xs italic"><HiExclamationCircle/> Buat Password yang unik dan mudah diingat.</p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Posisi
                    </label>
                    <div className="relative">
                      <select className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorPosisi ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-state"
                       value={posisi_id}
                       autoComplete="off"
                       onChange={e=>setPosisi_id(e.target.value)}
                       >
                      <option selected value="" disabled>-- Pilih Posisi --</option>
                      {posisiType.map(posisi => (
                          <option key={posisi.id} value={posisi.id}>
                            {posisi.nama_posisi}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    {errorPosisi && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorPosisi}</p>}
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Cabang
                    </label>
                    <div className="relative">
                      <select className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorCabang ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-state"
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
                    {errorCabang && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle/>{errorCabang}</p>}
                  </div>
                </div>
          </form>
        </div>
      );
    return (
        <>
        <BtnData
           content={modalContent} formSubmit={addUser} onClose={resetForm}
          ></BtnData>
        </>
    )
}
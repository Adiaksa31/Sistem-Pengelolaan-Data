'use client'

import { SyntheticEvent, useState, useEffect } from "react";
import BtnEditData from "../components/btnEditData";
import token from "../components/token";

type User = {
    id: number;
    nama: string;
    email: string;
    nomor: number;
    posisi: any;
    cabang: any;
    password: any;
    status: string;
  }

  export default function UpdateUser({ user }: { user: User }) {
    const [id, setId] = useState(user.id);
    const [nama, setNama] = useState(user.nama);
    const [email, setEmail] = useState(user.email);
    const [nomor, setNomor] = useState(user.nomor);
    const [password, setPassword] = useState(user.password);
    const [posisi_id, setPosisi_id] = useState(user.posisi.id);
    const [cabang_id, setCabang_id] = useState(user.cabang.id);
    const [status, setStatus] = useState(user.status);
    const [error, setError] = useState<string | null>(null); 
  
    async function handelUpdateUser(e: SyntheticEvent) {
      e.preventDefault();
      try {
        const preparedData = {
          id,
          nama,
          email,
          nomor,
          posisi_id,
          cabang_id,
          password,
          status,
        };

        const response = await fetch('http://localhost:3000/api/user/update', {
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
    const modalContent = (
        <div className="p-4">
          <h1 className="text-center font-bold text-xl">Edit Data {user.nama}</h1>
          <br />
          <form onSubmit={handelUpdateUser} className="w-full max-w-lg">
                {/* hidden id */}
                <input type="hidden" name="id" value={id} />
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nama
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
                      Nomor
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nomor..." 
                     value={nomor}
                     onChange={e=>setNomor(Number(e.target.value))}
                     />
                    <p className="text-red-500 text-xs italic">Username sudah digunakan.</p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                      Password
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" 
                     value={password}
                     onChange={e=>setPassword(e.target.value)}
                    />
                    <p className="text-gray-600 text-xs italic">Buat Password yang unik dan mudah diingat.</p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Posisi
                    </label>
                    <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={posisi_id}
                       onChange={e=>setPosisi_id(e.target.value)}
                       >
                      <option disabled selected>-- Pilih Posisi --</option>
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
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Cabang
                    </label>
                    <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={cabang_id}
                       onChange={e=>setCabang_id(e.target.value)} >
                      <option disabled selected>-- Pilih Cabang --</option>
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
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Status
                    </label>
                    <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={status}
                       onChange={e=>setStatus(e.target.value)} >
                      <option disabled selected>-- Pilih Status --</option>
                        <option>yes</option>
                        <option>no</option>
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
           content={modalContent} formSubmitEdt={handelUpdateUser}
          ></BtnEditData>
        </>
    )
}
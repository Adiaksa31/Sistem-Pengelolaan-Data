'use client'

import { SyntheticEvent, useState } from "react";
import BtnEditData from "../components/btnEditData";

const token4 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1hIjoiQWd1bmciLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsIm5vbW9yIjoiMTExMTExMSIsInBvc2lzaV9pZCI6MSwiY2FiYW5nX2lkIjoxLCJzdGF0dXNfdXNlciI6InllcyIsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTAyVDExOjA3OjU1LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0wMlQxMTowNzo1NS4wMDBaIn0sImlhdCI6MTcxNDgxNDYzNiwiZXhwIjoxNzE0OTAxMDM2fQ.5Tiz9uqhFNPFdMZ9gSf9gvXuCvrf8-ioaJjafHJ0yU4';

type User = {
    id: number;
    nama: string;
    email: string;
    nomor: number;
    password: any;
  }

  export default function UpdateUser({ user }: { user: User }) {
    const [nama, setNama] = useState(user.nama);
    const [email, setEmail] = useState(user.email);
    const [nomor, setNomor] = useState(user.nomor);
    const [password, setPassword] = useState(user.password);
    const [error, setError] = useState<string | null>(null); 
  
    async function handelUpdateUser(e: SyntheticEvent) {
      e.preventDefault();
      try {
        const preparedData = {
          nama,
          email,
          nomor,
          password,
        };

        const response = await fetch('http://localhost:3000/api/user/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token4}`,
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
    const modalContent = (
        <div className="p-4">
          <h1 className="text-center font-bold text-xl">Edit Data {user.nama}</h1>
          <br />
          <form onSubmit={handelUpdateUser} className="w-full max-w-lg">
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
'use client'

import { SyntheticEvent, useState } from "react";
import BtnEditData from "../components/btnEditData";
import token from "../components/token";
import { useRouter } from "next/navigation";

type Posisi = {
    id: number;
    nama: string;
    nama_posisi: string;
    status: string;
  }

  export default function UpdateJabatan({ posisi }: { posisi: Posisi }) {
    const [id, setId] = useState(posisi.id);
    const [nama, setNama] = useState(posisi.nama_posisi);
    const [status, setStatus] = useState(posisi.status);
    const [error, setError] = useState<string | null>(null); 
  const router = useRouter();
    async function handelUpdateJabatan(e: SyntheticEvent) {
      e.preventDefault();
      try {
        const preparedData = {
          id,
          nama,
          status,
        };

        const response = await fetch('http://localhost:3000/api/jabatan/update', {
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
        router.refresh(); 
        return response;
        
      } catch (error) {
        console.error('Error:', error as Error);
        setError((error as Error).message || 'Unknown error'); 
      }
    }
   
    const modalContent = (
        <div className="p-4">
          <h1 className="text-center font-bold text-xl">Edit Data {posisi.nama_posisi}</h1>
          <br />
          <form onSubmit={handelUpdateJabatan} className="w-full max-w-lg">
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
           content={modalContent} formSubmitEdt={handelUpdateJabatan}
          ></BtnEditData>
        </>
    )
}
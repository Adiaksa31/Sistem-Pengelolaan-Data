'use client'

import { SyntheticEvent, useState } from "react";
import BtnEditData from "../components/btnEditData";

const token4 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1hIjoiQWd1bmciLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsIm5vbW9yIjoiMTExMTExMSIsInBvc2lzaV9pZCI6MSwiY2FiYW5nX2lkIjoxLCJzdGF0dXNfdXNlciI6InllcyIsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTAyVDExOjA3OjU1LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0wMlQxMTowNzo1NS4wMDBaIn0sImlhdCI6MTcxNDk2NTYzMSwiZXhwIjoxNzE1MDUyMDMxfQ.pAWcRHpfq4UREZVwAKSOi-OspGGG-bt3WO7PJLxdcQ8';

type Cabang = {
    id: number;
    nomor: number;
    nama_cabang: string;
    alamat_cabang: string;
    status_cabang: string;
  }

  export default function UpdateCabang({ cabang }: { cabang: Cabang }) {
    const [id, setId] = useState(cabang.id);
    const [nama_cabang, setNamaCabang] = useState(cabang.nama_cabang);
    const [alamat_cabang, setAlamatCabang] = useState(cabang.alamat_cabang);
    const [nomor, setNomor] = useState(cabang.nomor);
    const [status_cabang, setStatusCabang] = useState(cabang.status_cabang);
    const [error, setError] = useState<string | null>(null); 
  
    async function handelUpdateCabang(e: SyntheticEvent) {
      e.preventDefault();
      try {
        const preparedData = {
          id,
          nama_cabang,
          nomor,
          alamat_cabang,
          status_cabang,
        };

        const response = await fetch('http://localhost:3000/api/cabang/update', {
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
          <h1 className="text-center font-bold text-xl">Edit Data {cabang.nama_cabang}</h1>
          <br />
          <form onSubmit={handelUpdateCabang} className="w-full max-w-lg">
                {/* hidden id */}
                <input type="hidden" name="id" value={id} />
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nama Cabang
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nama..." 
                    value={nama_cabang}
                    onChange={e=>setNamaCabang(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Alamat Cabang
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nama..." 
                    value={alamat_cabang}
                    onChange={e=>setAlamatCabang(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nomor
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nama..." 
                    value={nomor}
                    onChange={e=>setNomor(Number(e.target.value))}
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
                       value={status_cabang}
                       onChange={e=>setStatusCabang(e.target.value)} >
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
           content={modalContent} formSubmitEdt={handelUpdateCabang}
          ></BtnEditData>
        </>
    )
}
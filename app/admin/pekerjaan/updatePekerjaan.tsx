'use client'

import { SyntheticEvent, useState } from "react";
import BtnEditData from "../components/btnEditData";
import token from "../components/token";
import { toast } from "@/components/ui/use-toast";

type Pekerjaan = {
    id: number;
    nama: string;
    nama_pekerjaan: string;
  }
  interface UpdatePekerjaanProps {
    pekerjaan: Pekerjaan;
    reloadTable: () => void;
  }
  export default function UpdatePekerjaan({ pekerjaan, reloadTable }: UpdatePekerjaanProps) {
    const [id, setId] = useState(pekerjaan.id);
    const [nama, setNama] = useState(pekerjaan.nama_pekerjaan);
    const [error, setError] = useState<string | null>(null); 
  
    async function handelUpdatePekerjaan(e: SyntheticEvent) {
      e.preventDefault();
      try {
        const preparedData = {
          id,
          nama,
        };

        const response = await fetch('http://localhost:3000/api/pekerjaan/update', {
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
  
        toast({ title: `Data pekerjaan ${pekerjaan.nama_pekerjaan} berhasil diperbaharui`, variant: 'berhasil' });
        setError(null);
        reloadTable();
        return response;
        
      } catch (error) {
        console.error('Error:', error as Error);
        setError((error as Error).message || 'Unknown error'); 
      }
    }
    const modalContent = (
        <div className="p-4">
          <h1 className="text-center font-bold text-xl">Edit Data {pekerjaan.nama_pekerjaan}</h1>
          <br />
          <form onSubmit={handelUpdatePekerjaan} className="w-full max-w-lg">
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
          </form>
        </div>
      );
    return (
        <>
        <BtnEditData
           content={modalContent} formSubmitEdt={handelUpdatePekerjaan}
          ></BtnEditData>
        </>
    )
}
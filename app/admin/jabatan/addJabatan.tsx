'use client'
import { SyntheticEvent, useState } from "react";
import BtnData from "../components/btnData";
import token from "../components/token";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function AddJabatan() {
  const [nama, setNama] = useState("");
  const router = useRouter();

  async function addJabatan(e: SyntheticEvent) {
    e.preventDefault();
  
    try {
      const preparedData = {
        nama,
      };
  
      const response = await fetch('http://localhost:3000/api/jabatan/store', {
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
  
      toast({ title: 'Data berhasil ditambahkan', variant: 'berhasil'});
      router.refresh();
      return response;
    } catch (error) {
      console.error('Error:', error as Error);
    }
  }  
 
    const modalContent = (
        <div className="p-4">
          <h1 className="text-center font-bold text-xl">Tambah Data Jabatan</h1>
          <br />
          <form onSubmit={addJabatan} className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nama Jabatan
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
        <BtnData
           content={modalContent} formSubmit={addJabatan}
          ></BtnData>
        </>
    )
}
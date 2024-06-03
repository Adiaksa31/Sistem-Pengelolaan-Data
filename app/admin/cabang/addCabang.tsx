'use client'
import { SyntheticEvent, useState } from "react";
import BtnData from "../components/btnData";
import token from "../components/token";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function AddCabang() {
  const [nama_cabang, setNamaCabang] = useState("");
  const [alamat_cabang, setAlamatCabang] = useState("");
  const [nomor, setNomor] = useState("");
  const router = useRouter();

  async function addCabang(e: SyntheticEvent) {
    e.preventDefault();
  
    try {
      const preparedData = {
        nama_cabang,
        alamat_cabang,
        nomor,
      };
  
      const response = await fetch('http://localhost:3000/api/cabang/store', {
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
          <h1 className="text-center font-bold text-xl">Tambah Data Cabang</h1>
          <br />
          <form onSubmit={addCabang} className="w-full max-w-lg">
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
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Alamat..." 
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
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nomor..." 
                    value={nomor}
                    onChange={e=>setNomor(e.target.value)}
                    />
                  </div>
                </div>
          </form>
        </div>
      );
    return (
        <>
        <BtnData
           content={modalContent} formSubmit={addCabang}
          ></BtnData>
        </>
    )
}
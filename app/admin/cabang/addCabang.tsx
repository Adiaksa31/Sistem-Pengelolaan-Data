'use client'
import { SyntheticEvent, useState } from "react";
import BtnData from "../components/btnData";
import token from "../components/token";
import { toast } from "@/components/ui/use-toast";
import { HiExclamationCircle } from "react-icons/hi";

interface AddCabangProps {
  reloadTable: () => void;
}

export default function AddCabang({ reloadTable }: AddCabangProps) {
  const [nama_cabang, setNamaCabang] = useState("");
  const [alamat_cabang, setAlamatCabang] = useState("");
  const [nomor, setNomor] = useState("");
  const [errorNamaCabang, setErrorNamaCabang] = useState("");
  const [errorAlamatCabang, setErrorAlamatCabang] = useState("");
  const [errorNomor, setErrorNomor] = useState("");


  const resetForm = () => {
    setNamaCabang("");
    setAlamatCabang("");
    setNomor("");
    setErrorNamaCabang("");
    setErrorAlamatCabang("");
    setErrorNomor("");
  };


  async function addCabang(e: SyntheticEvent) {
    e.preventDefault();
  
    if (!nama_cabang) {
      setErrorNamaCabang("Nama cabang tidak boleh kosong");
  } else {
      setErrorNamaCabang("");
  }

  if (!alamat_cabang) {
      setErrorAlamatCabang("Alamat cabang tidak boleh kosong"); 
  } else {
      setErrorAlamatCabang("");
  }

  if (!nomor) {
      setErrorNomor("Nomor tidak boleh kosong");
      return;
  } else {
      setErrorNomor("");
  }

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
      reloadTable();
      return response;
    } catch (error) {
      console.error('Error:', error as Error);
    }
  }  

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
          <h1 className="text-center font-bold text-xl">Tambah Data Cabang</h1>
          <br />
          <form onSubmit={addCabang} className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nama Cabang
                    </label>
                    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorNamaCabang ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="nama_cabang" type="text" placeholder="Masukkan Nama..." 
                    value={nama_cabang}
                    autoComplete="off"
                    onChange={e=>setNamaCabang(e.target.value)}
                    />
                     {errorNamaCabang && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle />{errorNamaCabang}</p>}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Alamat Cabang
                    </label>
                    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorAlamatCabang ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="alamat_cabang" type="text" placeholder="Masukkan Alamat..." 
                    value={alamat_cabang}
                    autoComplete="off"
                    onChange={e=>setAlamatCabang(e.target.value)}
                    />
                     {errorAlamatCabang && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle />{errorAlamatCabang}</p>}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nomor
                    </label>
                    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                      errorNomor ? "border-red-500" : "border-gray-200"
                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="nomor" type="text" placeholder="Masukkan Nomor..." 
                    value={nomor}
                    autoComplete="off"
                    onChange={handleNomorChange}
                    />
                     {errorNomor && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle />{errorNomor}</p>}
                  </div>
                </div>
          </form>
        </div>
      );
    return (
        <>
        <BtnData
           content={modalContent} formSubmit={addCabang} onClose={resetForm}
          ></BtnData>
        </>
    )
}
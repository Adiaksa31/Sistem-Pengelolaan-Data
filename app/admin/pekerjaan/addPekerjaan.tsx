'use client'
import { SyntheticEvent, useState } from "react";
import BtnData from "../components/btnData";
import token from "../components/token";
import { toast } from "@/components/ui/use-toast";
import { HiExclamationCircle } from "react-icons/hi";

interface AddPekerjaanProps {
  reloadTable: () => void;
}

export default function AddPekerjaan({ reloadTable }: AddPekerjaanProps) {
  const [nama, setNama] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setNama("");
    setError("");
  };

  async function addPekerjaan(e: SyntheticEvent) {
    e.preventDefault();

    if (!nama) {
      setError("Nama Pekerjaan tidak boleh kosong");
      return;
    } else {
      setError("");
    }

    try {
      const preparedData = {
        nama,
      };

      const response = await fetch('http://localhost:3000/api/pekerjaan/store', {
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

  const modalContent = (
    <div className="p-4">
      <h1 className="text-center font-bold text-xl">Tambah Data Pekerjaan</h1>
      <br />
      <form onSubmit={addPekerjaan} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nama Pekerjaan
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${error ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="grid-first-name"
              type="text"
              placeholder="Masukkan Nama..."
              autoComplete="off"
              value={nama}
              onChange={e => setNama(e.target.value)}
            />
            {error && <p className="flex items-center text-red-500 text-xs italic"><HiExclamationCircle />{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <BtnData
        content={modalContent}
        formSubmit={addPekerjaan}
        onClose={resetForm}
      ></BtnData>
    </>
  );
}

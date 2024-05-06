'use client'
import { SyntheticEvent, useState } from "react";
import BtnData from "../components/btnData";

const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1hIjoiQWd1bmciLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsIm5vbW9yIjoiMTExMTExMSIsInBvc2lzaV9pZCI6MSwiY2FiYW5nX2lkIjoxLCJzdGF0dXNfdXNlciI6InllcyIsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTAyVDExOjA3OjU1LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0wMlQxMTowNzo1NS4wMDBaIn0sImlhdCI6MTcxNDk2NTYzMSwiZXhwIjoxNzE1MDUyMDMxfQ.pAWcRHpfq4UREZVwAKSOi-OspGGG-bt3WO7PJLxdcQ8';

export default function AddPekerjaan() {
  const [nama, setNama] = useState("");

  async function addPekerjaan(e: SyntheticEvent) {
    e.preventDefault();
  
    try {
      const preparedData = {
        nama,
      };
  
      const response = await fetch('http://localhost:3000/api/pekerjaan/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token2}`,
        },
        body: JSON.stringify(preparedData),
      });
  
      if (!response.ok) {
  
        const errorData = await response.json();
        throw new Error(`Gagal menambahkan data: ${errorData.message || 'Unknown error'}`);
      }
  
      console.log('Data berhasil ditambahkan');
      window.location.reload();
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
        <BtnData
           content={modalContent} formSubmit={addPekerjaan}
          ></BtnData>
        </>
    )
}
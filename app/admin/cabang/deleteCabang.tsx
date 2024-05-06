'use client'

import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

const token3 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1hIjoiQWd1bmciLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsIm5vbW9yIjoiMTExMTExMSIsInBvc2lzaV9pZCI6MSwiY2FiYW5nX2lkIjoxLCJzdGF0dXNfdXNlciI6InllcyIsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTAyVDExOjA3OjU1LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0wMlQxMTowNzo1NS4wMDBaIn0sImlhdCI6MTcxNDk2NTYzMSwiZXhwIjoxNzE1MDUyMDMxfQ.pAWcRHpfq4UREZVwAKSOi-OspGGG-bt3WO7PJLxdcQ8';
type Cabang = {
    id: number;
    nama_cabang: string;
    alamat_cabang: string;
    nomor: number;
    status_cabang: string;
  }

  export default function DeleteCabang(cabang: Cabang) {

    const [error, setError] = useState<string | null>(null);
  
    async function handleDeleteCabang(cabangId: number) {
      try {
        const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus Jabatan ${cabang.nama_cabang}?`);
        if (!confirmDelete) return;
  
        const params = new URLSearchParams();
        params.append('id', cabangId.toString());

        const response = await fetch('http://localhost:3000/api/cabang/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token3}`,
          },
          body: params.toString(),
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
  
        console.log('Jabatan deleted successfully');
        window.location.reload();
      } catch (error: any) {
        setError(error?.message || 'An error occurred while deleting the user.');
      }
    }
  
    return (
      <> 
          <button
            type="button"
            className="rounded bg-red-600 hover:bg-red-700 px-2 py-2 text-white"
            onClick={() => handleDeleteCabang(cabang.id)}
          >
            <FaTrashCan />
          </button>
   
      </> 
    );
  }
  
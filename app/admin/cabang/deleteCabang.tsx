'use client'

import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import token from "../components/token";
import { useRouter } from "next/navigation";

type Cabang = {
    id: number;
    nama_cabang: string;
    alamat_cabang: string;
    nomor: number;
    status_cabang: string;
  }

  export default function DeleteCabang(cabang: Cabang) {

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
  
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
            'Authorization': `Bearer ${token}`,
          },
          body: params.toString(),
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
  
        console.log('Jabatan deleted successfully');
        router.refresh();
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
  
'use client'

import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import token from "../components/token";
import { useRouter } from "next/navigation";

type Pekerjaan = {
    id: number;
    nama: string;
    nama_pekerjaan: string;
  }

  export default function DeletePekerjaan(pekerjaan: Pekerjaan) {

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
  
    async function handleDeletePekerjaan(pekerjaanId: number) {
      try {
        const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus pengguna ${pekerjaan.nama_pekerjaan}?`);
        if (!confirmDelete) return;
  
        const params = new URLSearchParams();
        params.append('id', pekerjaanId.toString());

        const response = await fetch('http://localhost:3000/api/pekerjaan/delete', {
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
  
        console.log('User deleted successfully');
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
            onClick={() => handleDeletePekerjaan(pekerjaan.id)}
          >
            <FaTrashCan />
          </button>
   
      </> 
    );
  }
  
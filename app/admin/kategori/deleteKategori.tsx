'use client'

import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import token from "../components/token";

type Kategori = {
    id: number;
    nama_kategori: string;
    status_kategori: string;
  }

  export default function DeleteKategori(kategori: Kategori) {

    const [error, setError] = useState<string | null>(null);
  
    async function handleDeleteKategori(kategoriId: number) {
      try {
        const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus pengguna ${kategori.nama_kategori}?`);
        if (!confirmDelete) return;
  
        const params = new URLSearchParams();
        params.append('id', kategoriId.toString());

        const response = await fetch('http://localhost:3000/api/kategori/delete', {
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
            onClick={() => handleDeleteKategori(kategori.id)}
          >
            <FaTrashCan />
          </button>
   
      </> 
    );
  }
  
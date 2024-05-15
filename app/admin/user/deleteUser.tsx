'use client'

import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import token from "../components/token";
import { useRouter } from "next/navigation";

type User = {
    id: number;
    nama: string;
    email: string;
    nomor: number;
    posisi: any;
    cabang: any;
    status: string;
  }

  export default function DeleteUser(user: User) {

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
  
    async function handleDeleteUser(userId: number) {
      try {
        const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus pengguna ${user.nama}?`);
        if (!confirmDelete) return;
  
        const params = new URLSearchParams();
        params.append('id', userId.toString());

        const response = await fetch('http://localhost:3000/api/user/delete', {
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
            onClick={() => handleDeleteUser(user.id)}
          >
            <FaTrashCan />
          </button>
   
      </> 
    );
  }
  
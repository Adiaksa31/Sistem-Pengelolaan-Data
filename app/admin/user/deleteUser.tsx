'use client'

import { useState, useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";

const token3 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1hIjoiQWd1bmciLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsIm5vbW9yIjoiMTExMTExMSIsInBvc2lzaV9pZCI6MSwiY2FiYW5nX2lkIjoxLCJzdGF0dXNfdXNlciI6InllcyIsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTAyVDExOjA3OjU1LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0wMlQxMTowNzo1NS4wMDBaIn0sImlhdCI6MTcxNDgxNDYzNiwiZXhwIjoxNzE0OTAxMDM2fQ.5Tiz9uqhFNPFdMZ9gSf9gvXuCvrf8-ioaJjafHJ0yU4';
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
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    async function handleDeleteUser(userId: number) {
      try {
        const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus pengguna ${user.nama}?`);
        if (!confirmDelete) return;
  
        const response = await fetch(`http://localhost:3000/api/user/delete/${userId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token3}`,
          },
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
  
        setIsDeleted(true);
        console.log('User deleted successfully');
      } catch (error: any) {
        setError(error?.message || 'An error occurred while deleting the user.');
      }
    }
  
    useEffect(() => {
      // Optionally, update other components or UI elements based on isDeleted state
    }, [isDeleted]);
  
    return (
      <> 
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <button
            type="button"
            className="rounded bg-red-600 hover:bg-red-700 px-2 py-2 text-white"
            onClick={() => handleDeleteUser(user.id)}
          >
            <FaTrashCan />
          </button>
        )}
        {isDeleted && <p>User deleted successfully!</p>}
      </> 
    );
  }
  
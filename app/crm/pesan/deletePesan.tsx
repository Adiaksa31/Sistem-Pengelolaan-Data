'use client'

import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import token from "../components/token";

type Pesanan = {
  id: number;
  kategori: any;
  costumer: any;
  sumber: string;
  type_motor: string;
  warna_motor: string;
  model_motor: string;
  jenis_pembayaran: string;
  jenis_service: string;
  jadwal_service: number;
  jenis_sparepart: string;
  nama_sparepart: string;
  jenis_keluhan: string;
  jenis_informasi: string;
  keterangan: string;
  cabang: any;
  crm: any;
  tujuan_user:any;
  status_kontak: string;
  }

  export default function DeletePesan(pesanan: Pesanan) {

    const [error, setError] = useState<string | null>(null);
  
    async function handleDeleteUser(pesananId: number) {
      try {
        const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus pesan/kontak atas nama ${pesanan.costumer.nama}?`);
        if (!confirmDelete) return;
  
        const params = new URLSearchParams();
        params.append('id', pesananId.toString());

        const response = await fetch('http://localhost:3000/api/pesanan/delete', {
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
            onClick={() => handleDeleteUser(pesanan.id)}
          >
            <FaTrashCan />
          </button>
   
      </> 
    );
  }
  
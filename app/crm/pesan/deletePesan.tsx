'use client'

import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import token from "../components/token";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    async function handleDeleteUser(pesananId: number) {
      try {
      
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
  
        toast({ title: `Data pesan ${pesanan.costumer.nama} berhasil dihapus`, variant: 'berhasil' });
        router.refresh();
      } catch (error: any) {
        setError(error?.message || 'An error occurred while deleting the user.');
      }
    }
  
    return (
      <>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger>
          <button
            type="button"
            className="rounded bg-red-600 hover:bg-red-700 px-2 py-2 text-white"
            onClick={() => setIsOpen(true)} // Buka dialog saat tombol diklik
          >
            <FaTrashCan />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin ingin menghapus data {pesanan.costumer.nama} ?</AlertDialogTitle>
            <AlertDialogDescription>
            Tindakan ini tidak bisa dibatalkan. Ini akan menghapus data {pesanan.costumer.nama} secara permanen
              dan menghapus data {pesanan.costumer.nama} dari server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className=" bg-red-600 text-white hover:bg-red-700 hover:text-white focus:outline-none" onClick={() => setIsOpen(false)}>Batal</AlertDialogCancel> 
            <AlertDialogAction className=" text-white bg-green-600 hover:bg-green-700 hover:text-white" onClick={() => { handleDeleteUser(pesanan.id); setIsOpen(false); }}>Lanjutkan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </> 
    );
  }
  
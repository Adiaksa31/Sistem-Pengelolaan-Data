'use client'

import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import token from "../components/token";
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

type Pelanggan = {
    id: number;
    nama: string;
    email: string;
    no_wa: number;
    tgl_lahir: any;
    agama: string;
    pekerjaan: any;
    jenis_kelamin: string;
    kelurahan: string;
    kecamatan: string;
    kabupaten: string;
  }
  interface DeletePelangganProps {
    pelanggan: Pelanggan;
    reloadTable: () => void;
  }
  
  export default function DeletePelanggan({ pelanggan, reloadTable }: DeletePelangganProps) {
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
  
    async function handleDeleteUser(pelangganId: number) {
      try {
        const params = new URLSearchParams();
        params.append('id', pelangganId.toString());

        const response = await fetch('http://103.84.207.76:3000/api/pelanggan/delete', {
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
  
        toast({ title: `Data ${pelanggan.nama} berhasil dihapus`, variant: 'berhasil' });
        reloadTable();
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
            <AlertDialogTitle>Yakin ingin menghapus data {pelanggan.nama} ?</AlertDialogTitle>
            <AlertDialogDescription>
            Tindakan ini tidak bisa dibatalkan. Ini akan menghapus data {pelanggan.nama} secara permanen
              dan menghapus data {pelanggan.nama} dari server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className=" bg-red-600 text-white hover:bg-red-700 hover:text-white focus:outline-none" onClick={() => setIsOpen(false)}>Batal</AlertDialogCancel> 
            <AlertDialogAction className=" text-white bg-green-600 hover:bg-green-700 hover:text-white" onClick={() => { handleDeleteUser(pelanggan.id); setIsOpen(false); }}>Lanjutkan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </> 
    );
  }
  
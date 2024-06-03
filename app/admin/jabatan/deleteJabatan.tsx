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

type Posisi = {
    id: number;
    nama: string;
    nama_posisi: string;
    status: string;
  }

  export default function DeleteJabatan(posisi: Posisi) {

    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
  
    async function handleDeleteJabatan(posisiId: number) {
      try {
        const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus Jabatan ${posisi.nama_posisi}?`);
        if (!confirmDelete) return;
  
        const params = new URLSearchParams();
        params.append('id', posisiId.toString());

        const response = await fetch('http://localhost:3000/api/jabatan/delete', {
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
  
        toast({ title: `Data jabatan ${posisi.nama_posisi} berhasil dihapus`, variant: 'berhasil' });
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
            onClick={() => setIsOpen(true)} 
          >
            <FaTrashCan />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin ingin menghapus data {posisi.nama_posisi} ?</AlertDialogTitle>
            <AlertDialogDescription>
            Tindakan ini tidak bisa dibatalkan. Ini akan menghapus data {posisi.nama_posisi} secara permanen
              dan menghapus data {posisi.nama_posisi} dari server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className=" bg-red-600 text-white hover:bg-red-700 hover:text-white focus:outline-none" onClick={() => setIsOpen(false)}>Batal</AlertDialogCancel> 
            <AlertDialogAction className=" text-white bg-green-600 hover:bg-green-700 hover:text-white" onClick={() => { handleDeleteJabatan(posisi.id); setIsOpen(false); }}>Lanjutkan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </> 
    );
  }
  
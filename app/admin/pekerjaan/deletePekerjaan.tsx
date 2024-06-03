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

type Pekerjaan = {
    id: number;
    nama: string;
    nama_pekerjaan: string;
  }

  export default function DeletePekerjaan(pekerjaan: Pekerjaan) {

    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
  
    async function handleDeletePekerjaan(pekerjaanId: number) {
      try {
       
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
  
        toast({ title: `Data pekerjaan ${pekerjaan.nama_pekerjaan} berhasil dihapus`, variant: 'berhasil' });
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
            <AlertDialogTitle>Yakin ingin menghapus data {pekerjaan.nama_pekerjaan} ?</AlertDialogTitle>
            <AlertDialogDescription>
            Tindakan ini tidak bisa dibatalkan. Ini akan menghapus data {pekerjaan.nama_pekerjaan} secara permanen
              dan menghapus data {pekerjaan.nama_pekerjaan} dari server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className=" bg-red-600 text-white hover:bg-red-700 hover:text-white focus:outline-none" onClick={() => setIsOpen(false)}>Batal</AlertDialogCancel> 
            <AlertDialogAction className=" text-white bg-green-600 hover:bg-green-700 hover:text-white" onClick={() => { handleDeletePekerjaan(pekerjaan.id); setIsOpen(false); }}>Lanjutkan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </> 
    );
  }
  
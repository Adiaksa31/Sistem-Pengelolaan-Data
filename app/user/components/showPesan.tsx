import React, { useState, useEffect } from "react";
import BtnShowData from "../components/btnShow";
import token from "../components/token";

type Order = {
  id: number;
  nama: string;
  kategori: any;
  kategori_id: any;
  costumer: any;
  no_wa: any;
  costumer_id: any;
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
  cabang_id: any;
  crm: any;
  crm_id: any;
  tujuan_user: any;
  status: string;
}

type Pesanan = {
  id: number;
  nama: string;
  kategori: any;
  kategori_id: any;
  costumer: any;
  no_wa: any;
  costumer_id: any;
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
  cabang_id: any;
  crm: any;
  crm_id: any;
  tujuan_user: any;
  status: string;
  created_at: any;
}

interface ShowPesanProps {
  pesanan: Order | Pesanan;
}

const ShowPesan: React.FC<ShowPesanProps> = ({ pesanan }) => {
  const [error, setError] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<Pesanan | null>(null); 
  useEffect(() => {
    async function fetchPesanan() {
      try {
        const params = new URLSearchParams();
        params.append('id', pesanan.id.toString());

        const response = await fetch('http://localhost:3000/api/pesanan/detail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
          },
          body: params.toString(),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const fetchedData: Pesanan = await response.json();
        setFetchedData(fetchedData); 
      } catch (error: any) {
        setError(error.message || 'Unknown error occurred');
      }
    }

    fetchPesanan();
    console.log(fetchPesanan());
  }, [pesanan.id]);

  if (error) {
    return <div>Error: {error}</div>;
  }


  const { costumer, kategori, kategori_id, sumber, type_motor, warna_motor, model_motor, jenis_pembayaran, jenis_service, jadwal_service, jenis_sparepart, nama_sparepart, jenis_keluhan, jenis_informasi, keterangan, cabang, cabang_id, crm, crm_id, tujuan_user, status } = fetchedData || {};
  
  const formattedJadwalService = new Date(pesanan.jadwal_service).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });


  const modalContent = (
    <div className="p-4">
        <h1 className="text-center font-bold text-xl text-gray-700">Data Pesanan {pesanan.nama}</h1>
        <br />
        <ul className="list-none">
            {pesanan.nama && (
                <li className="mb-2 text-gray-700"><strong>Nama Pelanggan:</strong> {pesanan.nama}</li>
            )}
             {pesanan.no_wa && (
                <li className="mb-2 text-gray-700"><strong>Nomor WA:</strong> {pesanan.no_wa}</li>
            )}
            {pesanan.sumber && (
                <li className="mb-2 text-gray-700"><strong>Sumber Pesanan:</strong> {pesanan.sumber}</li>
            )}
            {pesanan.kategori && (
                <li className="mb-2 text-gray-700"><strong>Kategori Pesanan:</strong> {pesanan.kategori}</li>
            )}
            {pesanan.type_motor && (
                <li className="mb-2 text-gray-700"><strong>Type Motor:</strong> {pesanan.type_motor}</li>
            )}
            {pesanan.warna_motor && (
                <li className="mb-2 text-gray-700"><strong>Warna Motor:</strong> {pesanan.warna_motor}</li>
            )}
            {pesanan.model_motor && (
                <li className="mb-2 text-gray-700"><strong>Model Motor:</strong> {pesanan.model_motor}</li>
            )}
            {pesanan.jenis_pembayaran && (
                <li className="mb-2 text-gray-700"><strong>Jenis Pembayaran:</strong> {pesanan.jenis_pembayaran}</li>
            )}
            {pesanan.jenis_service && (
                <li className="mb-2 text-gray-700"><strong>Jenis Service:</strong> {pesanan.jenis_service}</li>
            )}
            {pesanan.jadwal_service && (
                <li className="mb-2 text-gray-700"><strong>Jadwal Service:</strong> {formattedJadwalService}</li>
            )}
            {pesanan.jenis_sparepart && (
                <li className="mb-2 text-gray-700"><strong>Jenis Sparepart:</strong> {pesanan.jenis_sparepart}</li>
            )}
            {pesanan.nama_sparepart && (
                <li className="mb-2 text-gray-700"><strong>Nama Sparepart:</strong> {pesanan.nama_sparepart}</li>
            )}
            {pesanan.jenis_keluhan && (
                <li className="mb-2 text-gray-700"><strong>Jenis Keluhan:</strong> {pesanan.jenis_keluhan}</li>
            )}
            {pesanan.jenis_informasi && (
                <li className="mb-2 text-gray-700"><strong>Jenis Informasi:</strong> {pesanan.jenis_informasi}</li>
            )}
            {pesanan.keterangan && (
                <li className="mb-2 text-gray-700"><strong>Keterangan:</strong> {pesanan.keterangan}</li>
            )}
            {pesanan.cabang && (
                <li className="mb-2 text-gray-700"><strong>Cabang:</strong> {pesanan.cabang}</li>
            )}
            {pesanan.crm && (
                <li className="mb-2 text-gray-700"><strong>CRM:</strong> {pesanan.crm}</li>
            )}
            {pesanan.tujuan_user && (
                <li className="mb-2 text-gray-700"><strong>Tujuan User:</strong> {pesanan.tujuan_user.nama}</li>
            )}
            {pesanan.status && (
                <li className="mb-2 text-gray-700"><strong>Status Kontak:</strong> {pesanan.status}</li>
            )}
</ul>

    </div>
  );

  return (
    <>
      {modalContent && <BtnShowData content={modalContent} />}
    </>
  );
};

export default ShowPesan;

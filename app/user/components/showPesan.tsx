import React, { useState, useEffect } from "react";
import BtnShowData from "../components/btnShow";
import token from "../components/token";

type Order = {
  id: number;
  nama: string;
  kategori: any;
  kategori_id: any;
  costumer: any;
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

interface ShowPesanProps {
  pesanan: Order | Pesanan;
}

const ShowPesan: React.FC<ShowPesanProps> = ({ pesanan }) => {
  const [error, setError] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<Pesanan | null>(null); // Gunakan state untuk menyimpan data yang di-fetch

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
        setFetchedData(fetchedData); // Simpan data yang di-fetch ke dalam state
      } catch (error: any) {
        setError(error.message || 'Unknown error occurred');
      }
    }

    // Panggil fungsi fetchPesanan saat komponen mount
    fetchPesanan();
    console.log(fetchPesanan());
  }, [pesanan.id]); // Jadikan pesanan.id sebagai dependency agar fetchPesanan dipanggil ketika id berubah

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Gunakan destructuring assignment untuk mengambil nilai yang diperlukan dari fetchedData
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
      <h1 className="text-center font-bold text-xl">Data Pesanan {pesanan.nama}</h1>
      <br />
      <ul className="list-none">
  {pesanan.nama && (
    <li className="mb-2">Nama Pelanggan: {pesanan.nama}</li>
  )}
  {pesanan.sumber && (
    <li className="mb-2">Sumber Pesanan: {pesanan.sumber}</li>
  )}
  {pesanan.kategori && (
    <li className="mb-2">Kategori Pesanan: {pesanan.kategori}</li>
  )}
  {pesanan.type_motor && (
    <li className="mb-2">Type Motor: {pesanan.type_motor}</li>
  )}
  {pesanan.warna_motor && (
    <li className="mb-2">Warna Motor: {pesanan.warna_motor}</li>
  )}
  {pesanan.model_motor && (
    <li className="mb-2">Model Motor: {pesanan.model_motor}</li>
  )}
  {pesanan.jenis_pembayaran && (
    <li className="mb-2">Jenis Pembayaran: {pesanan.jenis_pembayaran}</li>
  )}
  {pesanan.jenis_service && (
    <li className="mb-2">Jenis Service: {pesanan.jenis_service}</li>
  )}
  {pesanan.jadwal_service && (
    <li className="mb-2">Jadwal Service: {formattedJadwalService}</li>
  )}
  {pesanan.jenis_sparepart && (
    <li className="mb-2">Jenis Sparepart: {pesanan.jenis_sparepart}</li>
  )}
  {pesanan.nama_sparepart && (
    <li className="mb-2">Nama Sparepart: {pesanan.nama_sparepart}</li>
  )}
  {pesanan.jenis_keluhan && (
    <li className="mb-2">Jenis Keluhan: {pesanan.jenis_keluhan}</li>
  )}
  {pesanan.jenis_informasi && (
    <li className="mb-2">Jenis Informasi: {pesanan.jenis_informasi}</li>
  )}
  {pesanan.keterangan && (
    <li className="mb-2">Keterangan: {pesanan.keterangan}</li>
  )}
  {pesanan.cabang && (
    <li className="mb-2">Cabang: {pesanan.cabang}</li>
  )}
  {pesanan.crm && (
    <li className="mb-2">CRM: {pesanan.crm}</li>
  )}
  {pesanan.tujuan_user && (
    <li className="mb-2">Tujuan User: {pesanan.tujuan_user}</li>
  )}
  {pesanan.status && (
    <li className="mb-2">Status Kontak: {pesanan.status}</li>
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

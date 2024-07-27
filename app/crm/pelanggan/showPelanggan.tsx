import React, { useState, useEffect } from "react";
import BtnShowData from "../components/btnShow";
import token from "../components/token";

type Pelanggan = {
  id: number;
  nama: string;
  email: string;
  no_wa: number;
  tgl_lahir: string; // Sesuaikan dengan tipe data yang sebenarnya
  agama: string;
  pekerjaan: {
    nama_pekerjaan: string;
  }; // Sesuaikan dengan tipe data yang sebenarnya
  jenis_kelamin: string;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
}

interface ShowPelangganProps {
  pelanggan: Pelanggan;
}

const ShowPelanggan: React.FC<ShowPelangganProps> = ({ pelanggan }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPelanggan() {
      try {
        const params = new URLSearchParams();
        params.append('id', pelanggan.id.toString());

        const response = await fetch('http://103.84.207.76:3000/api/pelanggan/detail', {
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

        const fetchedData: Pelanggan = await response.json();
        // Update the state with fetched data
        // setData(fetchedData); // Uncomment if using separate state for data
      } catch (error: any) {
        setError(error.message || 'Unknown error occurred');
      }
    }

    // Invoke fetchPelanggan when component mounts
    fetchPelanggan();
  }, [pelanggan.id]); // Dependency array ensures fetch is called when pelanggan.id changes

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  const formattedTanggalLahir = new Date(pelanggan.tgl_lahir).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const modalContent = (
    <div className="p-4">
      <h1 className="text-center font-bold text-xl">Data Pelanggan {pelanggan.nama}</h1>
      <br />
      <ul className="list-none list-inside">
      <li className="mb-2"><strong>Nama:</strong> {pelanggan.nama}</li>
        <li className="mb-2"><strong>Email:</strong> {pelanggan.email}</li>
        <li className="mb-2"><strong>Nomor Whatsapp:</strong> {pelanggan.no_wa}</li>
        <li className="mb-2"><strong>Tanggal Lahir:</strong> {formattedTanggalLahir}</li>
        <li className="mb-2"><strong>Agama:</strong> {pelanggan.agama}</li>
        <li className="mb-2"><strong>Jenis Kelamin:</strong> {pelanggan.jenis_kelamin}</li>
        <li className="mb-2"><strong>Pekerjaan:</strong> {pelanggan.pekerjaan.nama_pekerjaan}</li>
        <li className="mb-2"><strong>Kelurahan:</strong> {pelanggan.kelurahan}</li>
        <li className="mb-2"><strong>Kecamatan:</strong> {pelanggan.kecamatan}</li>
        <li className="mb-2"><strong>Kabupaten:</strong> {pelanggan.kabupaten}</li>
      </ul>
    </div>
  );

  return (
    <>
      {modalContent && <BtnShowData content={modalContent} />}
    </>
  );
};

export default ShowPelanggan;

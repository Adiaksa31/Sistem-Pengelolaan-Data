import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import token from "../components/token";

type Pesanan = {
  id: number;
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
  status_kontak: string;
};

async function getPesanans() {
  const res = await fetch('http://localhost:3000/api/pesanan/get', {
    cache: "no-store",
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 'error') {
      } else {
        return response.data;
      }
    })
    .catch(err => console.error(err));

  return res;
}

export default function Pesan() {
  const [pesanans, setPesanans] = useState<Pesanan[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const pesananData = await getPesanans();
        setPesanans(pesananData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Menghitung jumlah pesanan berdasarkan kategori
  const countByCategory = pesanans.reduce((acc: { [key: string]: number }, pesanan) => {
    const { kategori } = pesanan;
    if (kategori && kategori.nama) {
      const categoryName = kategori.nama;
      acc[categoryName] = (acc[categoryName] || 0) + 1;
    }
    return acc;
  }, {});

  // Mengonversi objek menjadi array dan menentukan warna untuk setiap kategori
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF69B4']; // Warna yang berbeda untuk setiap kategori
  const data = Object.keys(countByCategory).map((category, index) => ({
    name: category,
    value: countByCategory[category],
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <div className="w-full max-w-md md:w-1/2">
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div className="w-full pl-5 md:w-1/2 md:pl-10">
        <h1 className="text-xl mb-2">Keterangan :</h1>
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center my-1 px-5">
            <div className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

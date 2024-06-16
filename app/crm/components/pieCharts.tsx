import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
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
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '70%' }}>
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
      <div style={{ width: '30%' }}>
        <Legend
          verticalAlign="middle"
          align="left"
          layout="vertical"
          payload={data.map((entry, index) => ({
            value: entry.name,
            type: 'square',
            color: entry.color
          }))}
        />
      </div>
    </div>
  );
};

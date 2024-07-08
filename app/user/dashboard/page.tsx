'use client';
import React, { useEffect, useState } from 'react';
import NavAdmAts from '../components/navAdmAts';
import NavAdmBwh from '../components/navAdmBwh';
import TabKategori from '../components/TabKategori';
import KanbanBoard from '../components/KanbanBoard'; 
import { Order } from '../../../types/Order';
import { getToken } from '../components/TokenComponent';
import { User } from '../../../types/User';
import Report from '../components/Report';

const fetchOrders = async (token: string | null): Promise<Order[]> => {
  if (!token) {
    console.error('No token found');
    return [];
  }

  try {
    const res = await fetch('http://localhost:3000/api/pesanan/get', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
    const data = await res.json();
    if (data.status === 'error') {
      return [];
    } else {
      const orderData = data.data.map((order: any) => ({
        id: order.id,
        kategori_id: order.kategori.id,
        kategori: order.kategori.nama,
        cabang: order.cabang.nama,
        cabang_id: order.cabang.id,
        nama: order.costumer.nama,
        sumber: order.sumber,
        keterangan: order.keterangan,
        tanggal: order.created_at,
        status: order.status_kontak,
        type_motor: order.type_motor,
        warna_motor: order.warna_motor,
        model_motor: order.model_motor,
        jenis_pembayaran: order.jenis_pembayaran,
        jenis_service: order.jenis_service,
        jadwal_service: order.jadwal_service,
        jenis_sparepart: order.jenis_sparepart,
        nama_sparepart: order.nama_sparepart,
        jenis_keluhan: order.jenis_keluhan,
        jenis_informasi: order.jenis_informasi,
        crm: order.crm.nama,
        tujuan_user: order.tujuan_user,
      }));
      return orderData as Order[];
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};

const DashboardSPV: React.FC = () => {
  const [initialOrders, setInitialOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getToken();
    setToken(storedToken);

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      localStorage.removeItem('token');
      window.location.href = '/';
    }

    const loadOrders = async () => {
      if (storedToken) {
        const orders = await fetchOrders(storedToken);

        let orderData: Order[] = [];

        if (user?.posisi.id === 3 || user?.posisi.id === 4 || user?.posisi.id === 8) {
          orderData = orders.filter(order => order.kategori_id === 2);
        } else if (user?.posisi.id === 5 || user?.posisi.id === 7) {
          orderData = orders.filter(order => order.kategori_id === 1);
        } else if (user?.posisi.id === 5 || user?.posisi.id === 6) {
          orderData = orders.filter(order => order.kategori_id === 3);
        }

        // check request from url parameter, show only data from specific category id if exist
        // const urlParams = new URLSearchParams(window.location.search);
        // const categoryId = urlParams
        //   ? parseInt(urlParams.get('id') as string)
        //   : null;
        // if (categoryId) {
        //   orderData = orderData.filter(order => order.kategori_id === categoryId);
        // }

        if (!(user?.posisi.id === 3 || user?.posisi.id === 4 || user?.posisi.id === 5)) {
          orderData = orderData.filter(order => order.tujuan_user.id === user?.id);
        }

        // get all data for tujuan_user the same as user

        orderData = orderData.filter(order => order.cabang_id === user?.cabang.id);
        setInitialOrders(orderData);
      }
    };

    loadOrders();
  }, [user?.posisi.id, token, user?.cabang.id, user?.id]);

  return (
    <>
      <NavAdmAts />
      <NavAdmBwh currentPath="/user/dashboard" />
      {/* <TabKategori /> */}
      {user?.posisi.id === 3 || user?.posisi.id === 4 || user?.posisi.id === 5 ? (
        <Report initialOrders={initialOrders} />
      ) : null}
      <KanbanBoard initialOrders={initialOrders} /> 
    </>
  );
};

export default DashboardSPV;

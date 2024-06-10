'use client';
import React, { useEffect, useState } from 'react';
import NavAdmAts from '../components/navAdmAts';
import NavAdmBwh from '../components/navAdmBwh';
import TabKategori from '../components/TabKategori';
import StatusCards from '../components/StatusCard';
import { Order } from '../../../types/Order';
import { getToken } from '../components/TokenComponent';
import { User } from '../../../types/User';
import Kategori from '@/app/admin/kategori/page';

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
    // console.log('response: ', data);
    if (data.status === 'error') {
      return [];
    } else {
      var orderData = [];

      // interface Order {
      //   id: number;
      //   nama: string;
      //   keterangan: string;
      //   tanggal: string;
      //   status: string;
      // }

      for (let i = 0; i < data.data.length; i++) {
        orderData.push({
          id: data.data[i].id,
          kategori_id: data.data[i].kategori.id,
          nama: data.data[i].kategori.nama,
          keterangan: data.data[i].keterangan,
          tanggal: data.data[i].created_at,
          status: data.data[i].status_kontak,
        });
      }

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

        var orderData = [];

        // search order that have posisi_id from user
        // if user.posisi.id = 3 or 4 or 8 show Prospek Sale = kategori_id 2
        // if user.posisi.id = 5 or 7 show Booking Service = kategori_id 1
        // if user.posisi.id = 5 or 6 show Sparepart = kategori_id 3

        if (user?.posisi.id === 3 || user?.posisi.id === 4 || user?.posisi.id === 8) {
          for (let i = 0; i < orders.length; i++) {
            if (orders[i].kategori_id === 2) {
              orderData.push(orders[i]);
            }
          }
        } else if (user?.posisi.id === 5 || user?.posisi.id === 7) {
          for (let i = 0; i < orders.length; i++) {
            if (orders[i].kategori_id === 1) {
              orderData.push(orders[i]);
            }
          }
        } else if (user?.posisi.id === 5 || user?.posisi.id === 6) {
          for (let i = 0; i < orders.length; i++) {
            if (orders[i].kategori_id === 3) {
              orderData.push(orders[i]);
            }
          }
        }

        setInitialOrders(orderData as Order[]);
      }
    };

    loadOrders();
  }, [
    user?.posisi.id,
    token,
  ]);

  return (
    <>
      <NavAdmAts />
      <NavAdmBwh currentPath="/user/dashboard" />
      <TabKategori />
      <StatusCards initialOrders={initialOrders} />
    </>
  );
};

export default DashboardSPV;

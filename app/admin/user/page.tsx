"use client";
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import AddUser from "./addUser";
import UpdateUser from "./updateUser";
import DeleteUser from "./deleteUser";
import Table from "../components/table";
import Aksi from "../components/aksi";
import { useState, useEffect } from 'react';
import token from "../components/token";

async function getUsers() {
  try {
    const res = await fetch('http://localhost:3000/api/user/get', {
      cache: "no-store",
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });

    const data = await res.json();

    if (data.status === 'error') {
      throw new Error('Error fetching data');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

type User = {
  id: number;
  nama: string;
  email: string;
  nomor: number;
  password: any;
  posisi: any;
  cabang: any;
  status: string;
}

export default function User() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUsers();
      setUsers(userData);
    };

    fetchData();
  }, []);

  const reloadTable = async () => {
    try {
      const userData = await getUsers();
      setUsers(userData);
    } catch (error) {
      console.error('Error reloading table:', error);
    }
  };


  const tableData = {
    headers: ['No', 'Nama', 'Email', 'Nomor', 'Jabatan', 'Cabang', 'Status', 'Action'],
    rows: users.map((user, index) => [
      index + 1,
      user.nama,
      user.email,
      user.nomor,
      user.posisi.nama_posisi,
      user.cabang.nama_cabang,
      user.status,
      <div key={`aksi-${index}`} className="container mx-auto">
        <Aksi>
          <UpdateUser user={user} reloadTable={reloadTable}/>
          <DeleteUser user={user} reloadTable={reloadTable}/>
        </Aksi>
      </div>
    ]),
  };

  return (
    <>
      <NavAdmAts />
      <NavAdmBwh currentPath="/admin/user"/>

      <div className="p-3 md:px-10">
        <div className="px-3 pb-3 bg-white shadow">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
            <div>
              <h1 className="font-black py-2 px-1 text-3xl">User</h1>
            </div>
            <div className="flex items-center space-x-3">
              <AddUser reloadTable={reloadTable}/>
            </div>
          </div>
          <div>
            <Table data={tableData} />
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import AddUser from "./addUser";
import UpdateUser from "./updateUser";
import DeleteUser from "./deleteUser";
import Table from "../components/table";
import Aksi from "../components/aksi";
import Pagination from "../components/pagination";
import { useState, useEffect } from 'react';

// Ini masih cara manual ngeset token, nanti bakal diubah pake cara otomatis (biasanya kamu ambil dari session aplikasi)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1hIjoiQWd1bmciLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsIm5vbW9yIjoiMTExMTExMSIsInBvc2lzaV9pZCI6MSwiY2FiYW5nX2lkIjoxLCJzdGF0dXNfdXNlciI6InllcyIsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTAyVDExOjA3OjU1LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0wMlQxMTowNzo1NS4wMDBaIn0sImlhdCI6MTcxNDg5MzY2NSwiZXhwIjoxNzE0OTgwMDY1fQ.MonnB9wK5hLZ-wBsCZtLZuNyhVJSUSZsNMrppPAMP0M';

// fungsi ini bisa di taruh di lain file kalau kamu mau (misal: hooks/useUsers.ts)
async function getUsers() {
  const res = await fetch('http://localhost:3000/api/user/get',{
    method: 'POST',
    headers:{
      'Authorization': 'Bearer ' + token,
    }}).then(response => response.json())
		.then(response => {
      if (response.status === 'error') {
        // console.error('ERROR: ', response.message); // Buat ngecek errornya apa
      } else {
        // console.log('DATA: ', response.data); // Buat ngecek datanya
        return response.data;
      }
    })
		.catch(err => console.error(err));

  return res;
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
  const [users, setUsers] = useState([]);

  const userType = users as User[];

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

   const tableData = {
    headers: ['No', 'Nama', 'Email', 'Nomor', 'Jabatan', 'Cabang', 'Status', 'Action'],
    rows: userType.map((user, index) => [
      index + 1,
      user.nama,
      user.email,
      user.nomor,
      user.posisi.nama_posisi,
      user.cabang.nama_cabang,
      user.status,
    
      <div key={`aksi-${index}`} className="container mx-auto">
        <Aksi>
        <UpdateUser user={user} />
        <DeleteUser {...user} /> </Aksi>
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
        <div className="relative">
              <input type="text" id="table-search-users" className="block ps-10 py-2 text-sm border rounded-lg w-60 md:w-60 bg-white focus:ring-D32124 focus:border-D32124" placeholder="Search..." />
              <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
          </div>
          <AddUser></AddUser>
        </div>
      </div>
    <div>
      <Table data={tableData} 
      />
    </div>
    <br />
    <Pagination />
        
    </div>
    </div>
  </>
  );
}
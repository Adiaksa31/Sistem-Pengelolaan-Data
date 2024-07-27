'use client'
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import { useState, useEffect } from 'react';
import token from "../components/token";
import { ImUserTie } from "react-icons/im";
import { IoGitNetwork, IoBag } from "react-icons/io5";

async function fetchData(url: any) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  }).then(response => response.json())
    .then(response => {
      if (response.status === 'error') {
        throw new Error(response.message);
      } else {
        return response.data;
      }
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      throw err;
    });

  return res;
}

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [posisis, setPosisis] = useState([]);
  const [kategoris, setKategoris] = useState([]);
  const [cabangs, setCabangs] = useState([]);
  const [pekerjaans, setPekerjaans] = useState([]);

  useEffect(() => {
    async function fetchDataForDashboard() {
      try {
        const posisiData = await fetchData('http://103.84.207.76:3000/api/jabatan/get');
        setPosisis(posisiData);
        const userData = await fetchData('http://103.84.207.76:3000/api/user/get');
        setUsers(userData);
        const kategoriData = await fetchData('http://103.84.207.76:3000/api/kategori/get');
        setKategoris(kategoriData);
        const cabangData = await fetchData('http://103.84.207.76:3000/api/cabang/get');
        setCabangs(cabangData);
        const pekerjaanData = await fetchData('http://103.84.207.76:3000/api/pekerjaan/get');
        setPekerjaans(pekerjaanData);
      } catch (error) {
      
      }
    }
    fetchDataForDashboard();
  }, []);

  const formatNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  return (
  <>
    <NavAdmAts />
    <NavAdmBwh currentPath="/admin/dashboard"/>

    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 p-3 md:p-10">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl">
        <div className="flex flex-col items-center p-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-D32124">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
            <h5 className="pt-3 text-xl font-black text-black">{formatNumber(users.length)}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">User</span>  
        </div>
      </div>
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl">
        <div className="flex flex-col items-center p-5">
          <ImUserTie className="w-10 h-10 text-D32124"/>
            <h5 className="pt-3 text-xl font-black text-black">{formatNumber(posisis.length)}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Jabatan</span>  
        </div>
      </div>
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl">
        <div className="flex flex-col items-center p-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-D32124">
            <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
            <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
            <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
          </svg>
            <h5 className="pt-3 text-xl font-black text-black">{formatNumber(kategoris.length)}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Kategori</span>  
        </div>
      </div>
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl">
        <div className="flex flex-col items-center p-5">
          <IoGitNetwork  className="w-10 h-10 text-D32124"/>
            <h5 className="pt-3 text-xl font-black text-black">{formatNumber(cabangs.length)}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Cabang</span>  
        </div>
      </div>
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl">
        <div className="flex flex-col items-center p-5">
          <IoBag  className="w-10 h-10 text-D32124"/>
            <h5 className="pt-3 text-xl font-black text-black">{formatNumber(pekerjaans.length)}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Pekerjaan</span>  
        </div>
      </div>
    </div>
  </>
  );
}

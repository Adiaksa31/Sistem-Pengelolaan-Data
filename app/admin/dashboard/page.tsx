'use client'
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import { useState, useEffect } from 'react';
import token from "../components/token";

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

  useEffect(() => {
    async function fetchDataForDashboard() {
      try {
        const posisiData = await fetchData('http://localhost:3000/api/jabatan/get');
        setPosisis(posisiData);
        const userData = await fetchData('http://localhost:3000/api/user/get');
        setUsers(userData);
        const kategoriData = await fetchData('http://localhost:3000/api/kategori/get');
        setKategoris(kategoriData);
        const cabangData = await fetchData('http://localhost:3000/api/cabang/get');
        setCabangs(cabangData);
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

    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3 md:p-10">
      <div className="w-full max-w-sm bg-white rounded-lg shadow ">
        <div className="flex flex-col items-center p-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-D32124">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
            <h5 className="pt-3 text-xl font-black text-black">{formatNumber(users.length)}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">User</span>  
        </div>
      </div>
      <div className="w-full max-w-sm bg-white rounded-lg shadow ">
        <div className="flex flex-col items-center p-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-D32124">
            <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
          </svg>
            <h5 className="pt-3 text-xl font-black text-black">{formatNumber(posisis.length)}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Jabatan</span>  
        </div>
      </div>
      <div className="w-full max-w-sm bg-white rounded-lg shadow ">
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
      <div className="w-full max-w-sm bg-white rounded-lg shadow ">
        <div className="flex flex-col items-center p-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-D32124">
            <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clipRule="evenodd" />
          </svg>
            <h5 className="pt-3 text-xl font-black text-black">{formatNumber(cabangs.length)}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Cabang</span>  
        </div>
      </div>
    </div>
  </>
  );
}

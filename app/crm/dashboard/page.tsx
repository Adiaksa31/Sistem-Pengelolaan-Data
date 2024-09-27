'use client'
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import { useState, useEffect } from 'react';
import token from "../components/token";
import Chart from "../components/chart";
import PieCharts from "../components/pieCharts";

async function getPelanggans() {
  const res = await fetch('http://localhost:3000/api/pelanggan/get',{
  cache: "no-store",  
  method: 'POST',
    headers:{
      'Authorization': 'Bearer ' + token,
    }}).then(response => response.json())
		.then(response => {
      if (response.status === 'error') {
      } else {
        return response.data;
      }
    })
		.catch(err => console.error(err));

  return res;
}
async function getPesanans() {
  const res = await fetch('http://localhost:3000/api/pesanan/get',{
    cache: "no-store",
    method: 'POST',
    headers:{
      'Authorization': 'Bearer ' + token,
    }}).then(response => response.json())
		.then(response => {
      if (response.status === 'error') {
      } else {
        return response.data;
      }
    })
		.catch(err => console.error(err));

  return res;
}
export default function DashboardCrm() {
  const [pelanggans, setPelanggans] = useState([]);
  const [pesanans, setPesanans] = useState<{ status_kontak: string }[]>([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const pelangganData = await getPelanggans();
        setPelanggans(pelangganData);
        const pesananData = await getPesanans();
        setPesanans(pesananData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    const intervalId = setInterval(fetchData, 3000); 
    return () => clearInterval(intervalId);
  }, []);
  const formatNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };
  const countByStatus: Record<string, number> = pesanans.reduce((acc: Record<string, number>, pesanan) => {
    acc[pesanan.status_kontak] = (acc[pesanan.status_kontak] || 0) + 1;
    return acc;
  }, {});

  const orderedStatuses = ['Pending', 'Proses', 'Selesai', 'Batal'];

  function getTextColor(status: string) {
    switch(status) {
      case 'Pending':
        return 'text-yellow-600'; 
      case 'Proses':
        return 'text-blue-600'; 
      case 'Selesai':
        return 'text-green-600'; 
      case 'Batal':
        return 'text-red-600';
      default:
        return '';
    }
  }
  return (
  <>
    <NavAdmAts />
    <NavAdmBwh currentPath="/crm/dashboard"/>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3 md:px-10 md:pt-10">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg ">
        <div className="flex flex-col items-center p-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-D32124">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
            <h5 className="pt-3 text-xl font-black text-black">{formatNumber(pelanggans.length)}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Pelanggan</span>  
        </div>
      </div>
      <div className="md:col-span-3 w-full bg-white rounded-lg shadow-lg ">
        <h1 className="px-3 pt-3 font-bold">Rekap Pesan/Kontak</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
        {orderedStatuses.map(status => (
              countByStatus[status] !== undefined && (
                <div key={status} className="w-full max-w-sm bg-white rounded-lg shadow">
                  <div className="flex flex-col items-center p-5">
                    <h5 className="pt-3 text-xl font-black text-black">{formatNumber(countByStatus[status])}</h5>
                    <span className={`text-sm ${getTextColor(status)}`}>{status}</span>
                  </div>
                </div>
              )
            ))}
      </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-3 md:px-10">
      <div className="w-full bg-white rounded-lg shadow-lg ">
          <Chart />
      </div>

      <div className="w-full bg-white rounded-lg shadow-lg ">
        <PieCharts />
      </div>
    </div>
  </>
  );
}


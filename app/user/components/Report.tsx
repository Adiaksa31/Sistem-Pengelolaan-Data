import "./dashboard.css";
import React, { useState, useEffect } from 'react';
import { Order } from '../../../types/Order';
import { IoMail } from "react-icons/io5";

const formatNumber = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

interface ReportProps {
  initialOrders: Order[];
}

const Report: React.FC<ReportProps> = ({ initialOrders }) => {

  const [items, setItems] = useState<Order[]>(initialOrders);

  useEffect(() => {
    setItems(initialOrders);
  }, [initialOrders]);

  const countByStatus: Record<string, number> = items.reduce((acc: Record<string, number>, pesanan) => {
    acc[pesanan.status] = (acc[pesanan.status] || 0) + 1;
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3 md:px-10 md:pt-3">
        <div className="w-full max-w-sm bg-white rounded-lg shadow ">
          <div className="flex flex-col items-center p-5">
            <IoMail  className="w-10 h-10 text-D32124"/>
            <h5 className="pt-2 text-xl font-black text-black">{formatNumber(items.length)}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Banyak Pesan</span>  
          </div>
        </div>
        <div className="md:col-span-3 w-full bg-white rounded-lg shadow ">
          <h1 className="px-3 pt-3 font-bold">Rekap Pesan/Kontak</h1>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
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
    </>
  )
}

export default Report;
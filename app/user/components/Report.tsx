import "./dashboard.css";
import React from 'react';

const Report = () => {

    return (
        <>
        <div className="md:col-span-3 w-full bg-white rounded-lg shadow ">
        <h1 className="px-3 pt-3 font-bold">Rekap Pesan/Kontak</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
        {Object.entries(countByStatus).map(([status, count]) => (
          <div key={status} className="w-full max-w-sm bg-white rounded-lg shadow">
            <div className="flex flex-col items-center p-5">
              <h5 className="pt-3 text-xl font-black text-black">{formatNumber(count)}</h5>
              <span className={`text-sm ${getTextColor(status)}`}>{status}</span>
            </div>
          </div>
        ))}
      </div>
      </div>
        </>
    )
}

export default Report;

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import token from "../components/token";

// Define the type for the data
type PelangganData = {
  bulan: string;
  countPelanggan: number;
};

async function getPelanggans() {
  try {
    const res = await fetch('http://localhost:3000/api/pelanggan/get', {
      cache: "no-store",
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    const response = await res.json();
    console.log('Data pelanggan dari API:', response.data); 
    return response.status === 'error' ? [] : response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

const Chart: React.FC = () => {
  const [data, setData] = useState<PelangganData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const pelanggans = await getPelanggans();

        const countsByMonth: { [key: string]: number } = {};

        // Counting pelanggan by month
        pelanggans.forEach((pelanggan: any) => {
          const date = new Date(pelanggan.created_at);
          const month = date.getMonth() + 1;
          const year = date.getFullYear(); // Use the year from the created_at date
          const monthYear = `${year}-${pad(month, 2)}`; // Get year and zero-padded month
          countsByMonth[monthYear] = (countsByMonth[monthYear] || 0) + 1;
        });

        // Format the data for the chart
        const formattedData: PelangganData[] = [];
        for (let i = 1; i <= 12; i++) {
          const monthYear = `${new Date().getFullYear()}-${pad(i, 2)}`; // Get current year and zero-padded month
          const monthName = getMonthName(i);
          formattedData.push({
            bulan: monthName,
            countPelanggan: countsByMonth[monthYear] || 0,
          });
        }

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  // Function to pad numbers with leading zeros
  function pad(num: number, size: number) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  // Function to get month name
  function getMonthName(month: number) {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
      "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ];
    return monthNames[month - 1];
  }

  return (
    <div style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={400}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bulan" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="countPelanggan" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

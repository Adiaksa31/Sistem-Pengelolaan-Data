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

        // Create an object to hold the count of pelanggans per month
        const monthlyCounts: { [key: string]: any[] } = {};

        // Iterate over the pelanggan data
        pelanggans.forEach((pelanggan: any) => {
          const date = new Date(pelanggan.created_at);
          const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Get month and year
          
          // If the month does not exist in the monthlyCounts object, initialize it to an empty array
          if (!monthlyCounts[monthYear]) {
            monthlyCounts[monthYear] = [];
          }
          
          // Add pelanggan data to the respective month
          monthlyCounts[monthYear].push(pelanggan);
        });

        // Format the data for the chart
        const formattedData: PelangganData[] = [];
        for (let i = 1; i <= 12; i++) {
          const monthYear = `${i}-${new Date().getFullYear()}`;
          const monthName = new Date(`${i}-1-${new Date().getFullYear()}`).toLocaleString('default', { month: 'long' });
          formattedData.push({
            bulan: monthName,
            countPelanggan: monthlyCounts[monthYear] ? monthlyCounts[monthYear].length : 0,
          });
        }

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
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
}

export default Chart;

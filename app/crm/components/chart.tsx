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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiFilter } from "react-icons/hi";
import token from "../components/token";

// Define the type for the data
type PelangganData = {
  bulan: string;
  countPelanggan: number;
};

async function getPelanggans() {
  try {
    const res = await fetch('http://103.84.207.76:3000/api/pelanggan/get', {
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
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedPeriod, setSelectedPeriod] = useState<number>(1);
  const [filterText, setFilterText] = useState<string>('Periode 1 Bulan 2024');

  useEffect(() => {
    async function fetchData() {
      try {
        const pelanggans = await getPelanggans();

        const countsByMonth: { [key: string]: number } = {};

        // Counting pelanggan by month
        pelanggans.forEach((pelanggan: any) => {
          const date = new Date(pelanggan.created_at);
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const monthYear = `${year}-${pad(month, 2)}`;
          countsByMonth[monthYear] = (countsByMonth[monthYear] || 0) + 1;
        });

        // Format the data for the chart
        const formattedData: PelangganData[] = [];
        for (let i = 1; i <= 12; i += selectedPeriod) {
          let countPelanggan = 0;
          for (let j = 0; j < selectedPeriod; j++) {
            const currentMonthYear = `${selectedYear}-${pad(i + j, 2)}`;
            countPelanggan += countsByMonth[currentMonthYear] || 0;
          }
          const monthName = `${getMonthName(i)}${selectedPeriod > 1 ? ` - ${getMonthName(i + selectedPeriod - 1)}` : ''}`;
          formattedData.push({
            bulan: monthName,
            countPelanggan,
          });
        }

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [selectedYear, selectedPeriod]);

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

  // Function to handle year selection
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
    updateFilterText(year, selectedPeriod);
  };

  // Function to handle period selection
  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const period = parseInt(event.target.value);
    setSelectedPeriod(period);
    updateFilterText(selectedYear, period);
  };

  // Function to update filter text
  const updateFilterText = (year: number, period: number) => {
    setFilterText(`Periode ${period} bulan ${year}`);
  };


  return (
    <>
      <div className="px-3 pt-3 flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
        <div>
          <h1 className="font-bold text-2xl">Pelanggan</h1>
        </div>
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button
                className="flex items-center font-bold text-xs px-4 md:px-5 py-1.5 text-black"
              >
                {filterText} <HiFilter size={30} className='pl-2'/>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter Data</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className='px-2 py-2'>
                {/* Dropdown untuk Tahun */}
                <select
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="px-2 w-full py-2 border border-gray-300 rounded-md"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <option key={i} value={new Date().getFullYear() - i}>
                      {new Date().getFullYear() - i}
                    </option>
                  ))}
                </select>
              </div>
              <div className='px-2 py-2'>
                {/* Dropdown untuk Periode */}
                <select
                  value={selectedPeriod}
                  onChange={handlePeriodChange}
                  className="px-2 w-full py-2 border border-gray-300 rounded-md"
                >
                  <option value="1">1 Bulan</option>
                  <option value="2">2 Bulan</option>
                  <option value="3">3 Bulan</option>
                  <option value="6">6 Bulan</option>
                  <option value="12">12 Bulan</option>
                </select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
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
            <YAxis tickCount={4}/>
            <Tooltip />
            <Line type="monotone" dataKey="countPelanggan" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;

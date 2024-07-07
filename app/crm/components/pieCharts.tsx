import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import token from "../components/token";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { HiFilter } from 'react-icons/hi';

type Kategori = {
  nama: string;
};

type Pesanan = {
  id: number;
  kategori: Kategori;
  kategori_id: any;
  created_at: string;
};

async function getPesanans(): Promise<Pesanan[]> {
  const res = await fetch('http://localhost:3000/api/pesanan/get', {
    cache: "no-store",
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 'error') {
        throw new Error('Error fetching data');
      } else {
        return response.data;
      }
    })
    .catch(err => {
      console.error(err);
      return [];
    });

  return res;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF69B4'];

const Pesan: React.FC = () => {
  const [pesanans, setPesanans] = useState<Pesanan[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const pesananData = await getPesanans();

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(pesananData.map((pesanan: Pesanan) => pesanan.kategori.nama)));
        setCategories(uniqueCategories);

        const filteredData = pesananData.filter((pesanan: Pesanan) => {
          const pesananDate = new Date(pesanan.created_at);
          const pesananMonth = pesananDate.getMonth() + 1;
          const pesananYear = pesananDate.getFullYear().toString();
          const pesananCategory = pesanan.kategori.nama;

          const isMonthMatch = selectedMonth === 'all' || pesananMonth.toString() === selectedMonth;
          const isYearMatch = pesananYear === selectedYear;
          const isCategoryMatch = selectedCategory === 'all' || pesananCategory === selectedCategory;

          return isMonthMatch && isYearMatch && isCategoryMatch;
        });

        setPesanans(filteredData);

        console.log('Data yang didapatkan:', filteredData); // Tampilkan data yang didapatkan di console
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [selectedMonth, selectedYear, selectedCategory]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const countByCategory = pesanans.reduce((acc: { [key: string]: number }, pesanan: Pesanan) => {
    const { kategori } = pesanan;
    if (kategori && kategori.nama) {
      const categoryName = kategori.nama;
      acc[categoryName] = (acc[categoryName] || 0) + 1;
    }
    return acc;
  }, {});

  const data = Object.keys(countByCategory).map((category, index) => ({
    name: category,
    value: countByCategory[category],
    color: COLORS[index % COLORS.length]
  }));

  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return <option key={year} value={year}>{year}</option>;
  });

  const filterText = `${selectedMonth === 'all' ? 'Semua' : selectedMonth} ${selectedYear}`;
  // const filterText = `${selectedMonth === 'all' ? 'Semua' : selectedMonth} ${selectedYear} ${selectedCategory === 'all' ? 'Semua' : selectedCategory}`;
  return (
    <>
      <div className="px-3 pt-3 flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
        <div>
          <h1 className="font-bold text-2xl">Pesan/Kontak</h1>
        </div>
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="flex items-center font-bold text-xs px-4 md:px-5 py-1.5 text-black">
                {filterText} <HiFilter size={30} className='pl-2' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter Data</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className='px-2 py-2'>
                <select value={selectedYear} onChange={handleYearChange} className="px-2 w-full py-2 border border-gray-300 rounded-md">
                  {yearOptions}
                </select>
              </div>
              <div className='px-2 py-2'>
                <select value={selectedMonth} onChange={handleMonthChange} className="px-2 w-full py-2 border border-gray-300 rounded-md">
                  <option value="all">Semua Bulan</option>
                  <option value="1">Januari</option>
                  <option value="2">Februari</option>
                  <option value="3">Maret</option>
                  <option value="4">April</option>
                  <option value="5">Mei</option>
                  <option value="6">Juni</option>
                  <option value="7">Juli</option>
                  <option value="8">Agustus</option>
                  <option value="9">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </select>
              </div>
              <div className='px-2 py-2'>
                <select value={selectedCategory} onChange={handleCategoryChange} className="px-2 w-full py-2 border border-gray-300 rounded-md">
                  <option value="all">Semua Kategori</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="w-full max-w-md md:w-1/2">
          <PieChart width={400} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="w-full pl-5 md:w-1/2 md:pl-10">
          <h1 className="text-xl mb-2">Keterangan :</h1>
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center my-1 px-5">
              <div className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pesan;

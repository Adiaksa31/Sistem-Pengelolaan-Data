'use client'
import { SyntheticEvent, useState, useEffect } from "react";
import BtnData from "../components/btnData";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1hIjoiQWd1bmciLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsIm5vbW9yIjoiMTExMTExMSIsInBvc2lzaV9pZCI6MSwiY2FiYW5nX2lkIjoxLCJzdGF0dXNfdXNlciI6InllcyIsImNyZWF0ZWRfYXQiOiIyMDI0LTA1LTAyVDExOjA3OjU1LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNS0wMlQxMTowNzo1NS4wMDBaIn0sImlhdCI6MTcxNTUzNTc3MywiZXhwIjoxNzE1NjIyMTczfQ.RoZzfE9c9FQLGHzcduDGD-8f6gYS8o1Ave0MPY8PaC4';
export default function AddPelanggan() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [no_wa, setNo_wa] = useState("");
  const [tgl_lahir, setTgl_lahir] = useState("");
  const [agama, setAgama] = useState("");
  const [id_pekerjaan, setId_pekerjaan] = useState("");
  const [jenis_kelamin, setJenis_kelamin] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kabupaten, setKabupaten] = useState("");

  async function addPelanggan(e: SyntheticEvent) {
    e.preventDefault();
  
    try {
      const preparedData = {
        nama,
        email,
        no_wa,
        tgl_lahir,
        agama,
        id_pekerjaan,
        jenis_kelamin,
        kelurahan,
        kecamatan,
        kabupaten,
      };
  
      const response = await fetch('http://localhost:3000/api/pelanggan/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(preparedData),
      });
  
      if (!response.ok) {
  
        const errorData = await response.json();
        throw new Error(`Gagal menambahkan data: ${errorData.message || 'Unknown error'}`);
      }
  
      console.log('Data berhasil ditambahkan');
      window.location.reload();
      return response;
    } catch (error) {
      console.error('Error:', error as Error);
    }
  }  


  // async function getPosisis() {
  //   const res = await fetch('http://localhost:3000/api/jabatan/get',{
  //     method: 'POST',
  //     headers:{
  //       'Authorization': 'Bearer ' + token,
  //     }}).then(response => response.json())
  //     .then(response => {
  //       if (response.status === 'error') {
  //         // console.error('ERROR: ', response.message); // Buat ngecek errornya apa
  //       } else {
  //         // console.log('DATA: ', response.data); // Buat ngecek datanya
  //         return response.data;
  //       }
  //     })
  //     .catch(err => console.error(err));
  
  //   return res;
  // }

  // type Posisi = {
  //   id: number;
  //   nama_posisi: string;
  //   status: string;
  // }
  // const [posisis, setPosisis] = useState([]);
  // const posisiType = posisis as Posisi[];
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const posisiData = await getPosisis();
  //       setPosisis(posisiData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }

  //   fetchData();
  // }, []);  
    const modalContent = (
        <div className="p-4">
          <h1 className="text-center font-bold text-xl">Tambah Data Pelanggan</h1>
          <br />
          <form onSubmit={addPelanggan} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nama Pelanggan
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nama..." 
                    value={nama}
                    onChange={e=>setNama(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Email
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Email..." 
                     value={email}
                     onChange={e=>setEmail(e.target.value)}
                     />
                    <p className="text-red-500 text-xs italic">Username sudah digunakan.</p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nomor Whatsapp
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Masukkan Nomor..." 
                     value={no_wa}
                     onChange={e=>setNo_wa(e.target.value)}
                     />
                    <p className="text-red-500 text-xs italic">Username sudah digunakan.</p>
                  </div>
                </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Jenis Kelamin
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                   value={jenis_kelamin}
                   onChange={e=>setJenis_kelamin(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Jenis Kelamin --</option>
                    <option>Laki-laki</option>
                    <option>Perempuan</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Agama
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                  value={agama}
                  onChange={e=>setAgama(e.target.value)}>
                  <option selected value="" disabled >-- Pilih Agama --</option>
                    <option>Hindu</option>
                    <option>Islam</option>
                    <option>Budha</option>
                    <option>Kristen</option>
                    <option>Katolik</option>
                    <option>Khonghucu</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Tanggal Lahir
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="date" placeholder="Tanggal lahir..." 
                 value={tgl_lahir}
                 onChange={e=>setTgl_lahir(e.target.value)}/>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Kabupaten
                    </label>
                    <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={kabupaten}
                       onChange={e=>setKabupaten(e.target.value)} >
                      <option selected value="" disabled >-- Pilih --</option>
                        <option>Buleleng</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Kecamatan
                    </label>
                    <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={kecamatan}
                       onChange={e=>setKecamatan(e.target.value)} >
                      <option selected value="" disabled >-- Pilih --</option>
                     
                          <option>
                            Tejakula
                          </option>

                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Kelurahan
                    </label>
                    <div className="relative">
                      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                       value={kelurahan}
                       onChange={e=>setKelurahan(e.target.value)}
                       >
                      <option selected value="" disabled >-- Pilih --</option>
                      
                          <option>
                              Bondalem
                          </option>
 
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Pekerjaan
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                   value={id_pekerjaan}
                   onChange={e=>setId_pekerjaan(e.target.value)}>
                  <option disabled value="" selected>-- Pilih Pekerjaan --</option>
                    <option>1</option>
                    <option>2</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
            </div>
            </div>
         </form>
        </div>
      );
    return (
        <>
        <BtnData
           content={modalContent} formSubmit={addPelanggan}
          ></BtnData>
        </>
    )
}
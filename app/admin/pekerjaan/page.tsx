
import NavAdmAts from "../components/navAdmAts";
import NavAdmBwh from "../components/navAdmBwh";
import BtnData from "../components/btnData";
import Aksi from "../components/aksi";
import Pagination from "../components/pagination";

export default function Pekerjaan() {
  const modalContent = (
    <div className="p-4">
      <h1 className="text-center font-bold">Tambah Data Pekerjaan</h1>
      <form action="" method="post">
      <div className="input-box">
          <input type="text" name="pekerjaan" placeholder="Pekerjaan" required/>
        </div>
      </form>
    </div>
  );
  return (
  <>
    <NavAdmAts />
    <NavAdmBwh currentPath="/admin/pekerjaan"/>
  
    <div className="p-3 md:px-10">
    <div className="px-3 pb-3 bg-white shadow">
    <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
          <div>
          <h1 className="font-black py-2 px-1 text-3xl">Pekerjaan</h1>
          </div>
          <label className="sr-only">Search</label>
        <div className="flex items-center space-x-3">
        <div className="relative">
              <input type="text" id="table-search-users" className="block ps-10 py-2 text-sm border rounded-lg w-60 md:w-60 bg-white focus:ring-D32124 focus:border-D32124" placeholder="Search..." />
              <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
          </div>
          <BtnData
           content={modalContent}
          ></BtnData>
        </div>
      </div>
    <div className="relative overflow-x-auto shadow">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                    <th scope="col" className="px-4 py-3">
                        No
                    </th>
                    <th scope="col" className="px-8 py-3">
                        Nama Pekerjaan
                    </th>
                    <th scope="col" className="px-3 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                  </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b">
                    <th scope="row" className="px-4 py-4 font-medium text-black whitespace-nowrap ">
                        1
                    </th>
                    <td className="px-8 py-4">
                        Karyawan Swasta
                    </td>
                    <td className="px-3 py-4">
                        Yes
                    </td>
                    <td className="px-6 py-4 space-x-4">
                    <div className="container mx-auto">
                      <Aksi>
                      </Aksi>
                    </div>
                  </td>
                </tr>
            </tbody>
        </table>
    </div>
    <br />
    <Pagination />
        
    </div>
    </div>
  </>
  );
}

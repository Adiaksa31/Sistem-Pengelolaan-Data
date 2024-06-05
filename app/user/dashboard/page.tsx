import Image from "next/image";
import "./dashboard.css";
import Link from "next/link";
import KanbanBoard from '../components/kanban';




export default function DashboardSPV() {

  return (
  <>
    <nav className="bg-D32124 px-4 py-5 flex justify-between">
      <div className="flex items-center gap-x-3 text-xl md:px-5">
      <Image src="/Heronusa.PNG" alt="Heronusa Logo" width={100} height={100} />
      
      <button className="bg-white text-bold text-D32124 px-3 rounded-md" type="submit">Tuban</button>
      </div>

      <div className="flex items-center gap-x-3 md:px-5">
        <div className="text-white text-xs">
          <h1 className="font-bold text-right">Aksa</h1>
          <p className="text-right">Spv</p>
        </div>
        <Link href="/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
          <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg></Link>
      </div>
    </nav>

    <nav className="bg-B23030 px-4 py-3 flex justify-between">
      <div className="flex items-center gap-x-1 md:gap-x-0 md:px-5">
        <div className="me-1 flex items-center text-xs px-2 md:px-5 py-1 actives text-white rounded hover:text-B23030 hover:bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clipRule="evenodd" />
          </svg>
          <Link href="/spv/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav> 

<div className="py-3 px-10 text-sm font-medium text-center text-black">
    <ul className="flex flex-wrap space-x-3 -mb-px">
        <li className="me-2">
            <a href="#" className="inline-block py-2 border-b-2 border-transparent rounded-t-lg border-D32124 hover:text-D32124 hover:border-D32124 active">Prospek Sales</a>
        </li>
        <li className="me-2">
            <a href="#" className="inline-block py-2 text-black border-b-2 border-transparent rounded-t-lg hover:text-D32124 hover:border-D32124 ">Keluhan</a>
        </li>
    </ul>
</div>

<div className="px-10 ">
  <div className="bg-gray-100 shadow w-full rounded ">
  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
      <div className="w-full max-w-sm">
        <h1 className="pb-3">Pending (2)</h1>
        <div className="pb-4">
          <div className="p-3 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white">
                <div>
                <p className="text-sm ">Nama:</p>  
                </div>
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1 items-center font-bold text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                </div>
              </div>
            </div>
            <p className="text-sm ">Keterangan:</p>
            <br />
            <br />
            <br />
            <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                10 Januari</p>
        </div>
        </div>
        <div className="pb-4">
          <div className="p-3 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white">
                <div>
                <p className="text-sm ">Nama:</p>  
                </div>
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1 items-center font-bold text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                </div>
              </div>
            </div>
            <p className="text-sm ">Keterangan:</p>
            <br />
            <br />
            <br />
            <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                10 Januari</p>
        </div>
        </div>
      </div>
      <div className="w-full max-w-sm">
        <h1 className="pb-3">Proses (1)</h1>
        <div className="p-3 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white">
                <div>
                <p className="text-sm ">Nama:</p>  
                </div>
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1 items-center font-bold text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                </div>
              </div>
            </div>
            <p className="text-sm ">Keterangan:</p>
            <br />
            <br />
            <br />
            <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                10 Januari</p>
        </div>
      </div>
      <div className="w-full max-w-sm">
        <h1 className="pb-3">Selesai (1)</h1>
        <div className="p-3 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white">
                <div>
                <p className="text-sm ">Nama:</p>  
                </div>
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1 items-center font-bold text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                </div>
              </div>
            </div>
            <p className="text-sm ">Keterangan:</p>
            <br />
            <br />
            <br />
            <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                10 Januari</p>
        </div>
      </div>
      <div className="w-full max-w-sm">
        <h1 className="pb-3">Batal (1)</h1>
        <div className="p-3 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white">
                <div>
                <p className="text-sm ">Nama:</p>  
                </div>
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1 items-center font-bold text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                </div>
              </div>
            </div>
            <p className="text-sm ">Keterangan:</p>
            <br />
            <br />
            <br />
            <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                10 Januari</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>
      <KanbanBoard />

    </div>

  </>
  );
}

'use client'
import NavAdmAts from '../components/navAdmAts';
import NavAdmBwh from '../components/navAdmBwh';
import TabKategori from '../components/TabKategori';
import StatusCards from '../components/StatusCard';



export default function DashboardSPV() {

  return (
  <>
   <NavAdmAts />
   <NavAdmBwh currentPath="/user/dashboard" />
   <TabKategori />
  
   <StatusCards />
  </>
  );
}

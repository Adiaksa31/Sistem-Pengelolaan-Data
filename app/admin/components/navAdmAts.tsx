import "./dashboard.css";
import Image from "next/image";
import React from 'react';
import Link from 'next/link';

const NavAdmAts = () => {
  const user = localStorage.getItem('user');
  function removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  if (user) {
    const userData = JSON.parse(user);
    if (userData.posisi.id == 1) {
        // check the url is correct
        const url = window.location.href;
        const urlSplit = url.split('/');
        // url is http://localhost:3000/admin/dashboard search for admin in url
        if (urlSplit[3] !== 'admin') {
            window.location.href = '/admin/dashboard';
        }
    } else if (userData.posisi.id == 2) {
        // check the url is correct
        const url = window.location.href;
        const urlSplit = url.split('/');
        // url is http://localhost:3000/crm/dashboard search for crm in url
        if (urlSplit[3] !== 'crm') {
            window.location.href = '/crm/dashboard';
        }
    } else if (userData.posisi.id >= 3) {
        // check the url is correct
        const url = window.location.href;
        const urlSplit = url.split('/');
        // url is http://localhost:3000/spv/dashboard search for spv in url
        if (urlSplit[3] !== 'spv') {
            window.location.href = '/spv/dashboard';
        }
    }
  } else {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <>
    <nav className="bg-D32124 px-4 py-5 flex justify-between">
      <div className="flex items-center gap-x-3 text-xl md:px-5">
      <Image src="/Heronusa.PNG" alt="Heronusa Logo" width={100} height={100} />
      
      <button className="bg-white text-bold text-D32124 px-3 rounded-md" type="submit">
        {user ? JSON.parse(user).cabang.nama : 'Cabang'}
      </button>
      </div>

      <div className="flex items-center gap-x-3 md:px-5">
        <div className="text-white text-xs">
          <h1 className="font-bold text-right">
            {user ? JSON.parse(user).nama : 'User'}
          </h1>
          <p className="text-right">
            {user ? JSON.parse(user).posisi.nama : 'Posisi'}
          </p>
        </div>
        <Link onClick={removeToken} href="/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
          <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg></Link>
      </div>
    </nav>
    </>
  );
};

export default NavAdmAts;

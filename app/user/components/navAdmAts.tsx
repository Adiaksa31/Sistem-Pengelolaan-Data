'use client';

import React, { useEffect, useState } from 'react';
import "./dashboard.css";
import Image from "next/image";
import Link from 'next/link';
import { User } from '../../../types/User';

const NavAdmAts: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));

      const userData = JSON.parse(storedUser);
      const url = window.location.href;
      const urlSplit = url.split('/');

      if (userData.posisi.id === 1 && urlSplit[3] !== 'admin') {
        window.location.href = '/admin/dashboard';
      } else if (userData.posisi.id === 2 && urlSplit[3] !== 'crm') {
        window.location.href = '/crm/dashboard';
      } else if (userData.posisi.id >= 3 && urlSplit[3] !== 'user') {
        window.location.href = '/user/dashboard';
      }
    } else {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  }, []);

  function removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return (
    <>
      <nav className="bg-D32124 px-4 py-5 flex justify-between">
        <div className="flex items-center gap-x-3 text-xl md:px-5">
          <Image src="/Heronusa.PNG" alt="Heronusa Logo" width={100} height={100} />
          <button className="bg-white text-bold text-D32124 px-3 rounded-md" type="submit">
            {user ? user.cabang.nama : 'Cabang'}
          </button>
        </div>

        <div className="flex items-center gap-x-3 md:px-5">
          <div className="text-white text-xs">
            <h1 className="font-bold text-right">
              {user ? user.nama : 'User'}
            </h1>
            <p className="text-right">
              {user ? user.posisi.nama : 'Posisi'}
            </p>
          </div>
          <Link onClick={removeToken} href="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavAdmAts;

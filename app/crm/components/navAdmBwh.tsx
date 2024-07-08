import React from 'react';
import Link from 'next/link';
import { IoGrid, IoPersonSharp, IoMail } from "react-icons/io5";

type NavLink = {
  icon: React.ReactNode;
  label: string;
  href: string;
}; 

const navigationLinks: NavLink[] = [ 
  { icon: <IoGrid size={20} />, label: 'Dashboard', href: '/crm/dashboard' },
  { icon: <IoMail size={20} />, label: 'Pesan/Kontak', href: '/crm/pesan' },
  { icon: <IoPersonSharp size={20} />, label: 'Pelanggan', href: '/crm/pelanggan' },
];

const NavAdmBwh = ({ currentPath }: { currentPath: string }) => { 

  return (
    <nav className="bg-B23030 px-4 py-3 flex justify-between">
      <div className="flex items-center gap-y-1 md:gap-x-0 md:px-5">
        {navigationLinks.map((link) => (
          <div key={link.href}>
            <Link href={link.href}
            className={`md:text-sm me-1 flex items-center gap-1 text-xs px-2 md:px-5 py-1 text-white rounded hover:text-B23030 hover:bg-white ${
              currentPath === link.href ? 'actives' : ''
            }`}> {link.icon} {link.label}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavAdmBwh;

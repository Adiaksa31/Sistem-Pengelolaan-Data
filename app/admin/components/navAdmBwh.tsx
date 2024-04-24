import React from 'react';
import Link from 'next/link';
import { IoGrid, IoPersonSharp, IoGitNetwork, IoLayers, IoBag } from "react-icons/io5";
import './dashboard.css';

type NavLink = {
  icon: React.ReactNode;
  label: string;
  href: string;
}; 

const navigationLinks: NavLink[] = [ 
  { icon: <IoGrid size={20} />, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: <IoPersonSharp size={20} />, label: 'User', href: '/admin/user' },
  { icon: <IoGitNetwork size={20} />, label: 'Cabang', href: '/admin/cabang' },
  { icon: <IoLayers size={20} />, label: 'Kategori', href: '/admin/kategori' },
  { icon: <IoBag size={20} />, label: 'Pekerjaan', href: '/admin/pekerjaan' },
];

const NavAdmBwh = ({ currentPath }: { currentPath: string }) => { 
  return (
    <>
      <nav className="bg-B23030 px-4 py-3 flex justify-between">
        <div className="flex items-center gap-x-1 md:gap-x-0 md:px-5">
          {navigationLinks.map((link) => (
            <div
              key={link.href}
              className={`me-1 flex space-x-1 items-center text-xs px-2 md:px-5 py-1 text-white rounded hover:text-B23030 hover:bg-white ${
                currentPath === link.href ? 'actives' : ''
              }`}
            >
              {link.icon}
              <Link href={link.href} className="md:text-sm">{link.label}</Link>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavAdmBwh;

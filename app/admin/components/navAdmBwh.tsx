import React from 'react';
import Link from 'next/link';
import { IoGrid, IoPersonSharp, IoGitNetwork, IoLayers, IoBag } from "react-icons/io5";
import { ImUserTie } from "react-icons/im";
import './dashboard.css';

type NavLink = {
  icon: React.ReactNode;
  label: string;
  href: string;
}; 

const navigationLinks: NavLink[] = [ 
  { icon: <IoGrid size={20} />, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: <IoPersonSharp size={20} />, label: 'User', href: '/admin/user' },
  { icon: <ImUserTie  size={20} />, label: 'Jabatan', href: '/admin/jabatan' },
  { icon: <IoLayers size={20} />, label: 'Kategori', href: '/admin/kategori' },
  { icon: <IoGitNetwork size={20} />, label: 'Cabang', href: '/admin/cabang' },
  { icon: <IoBag size={20} />, label: 'Pekerjaan', href: '/admin/pekerjaan' },
];

const NavAdmBwh = ({ currentPath }: { currentPath: string }) => { 
  return (
    <>
      <nav className="bg-B23030 px-4 py-3 flex justify-between">
        <div className="flex items-center gap-x-1 md:gap-x-0 md:px-5">
          {navigationLinks.map((link) => (
            <div key={link.href}>
            <Link href={link.href}
            className={`md:text-sm me-1 flex items-center text-xs px-2 md:px-5 py-1 text-white rounded hover:text-B23030 hover:bg-white ${
              currentPath === link.href ? 'actives' : ''
            }`}> {link.icon} {link.label}
            </Link>
          </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavAdmBwh;

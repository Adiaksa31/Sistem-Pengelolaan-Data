'use client'
import React from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";


const Aksi: React.FC<{ children: React.ReactNode; } & any> = ({ children }) => {
   
  return (
    <>
        
        <div className="dropdown dropdown-left dropdown-hover dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1"><FaExternalLinkAlt /></div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded w-52">
            <li><a href="#">Edit</a></li>
            <li><a href="#">Delete</a></li>
            {children}
        </ul>
        </div>
    </>
  );
};

export default Aksi;

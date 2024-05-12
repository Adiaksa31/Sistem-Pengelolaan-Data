'use client'

import React from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";
import BtnEditData from "../components/btnEditData";


const Aksi: React.FC<{ children: React.ReactNode; } & any> = ({ children }) => {
   
  return (
    <>
      <div className='flex justify-start space-x-1 items-center'>
           <button className='rounded bg-blue-600 hover:bg-blue-700 p-2 text-white'><FaExternalLinkAlt/></button>
            {children}
      </div>
    </>
  );
};

export default Aksi;

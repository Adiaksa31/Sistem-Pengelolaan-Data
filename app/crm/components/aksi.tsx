'use client'

import React from 'react';

const Aksi: React.FC<{ children: React.ReactNode; } & any> = ({ children }) => {
   
  return (
    <>
      <div className='flex justify-start space-x-1 items-center'>
            {children}
      </div>
    </>
  );
};

export default Aksi;

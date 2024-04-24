'use client'
import React, { useState } from 'react';

import Modal from "../components/modal";


const BtnData: React.FC<{ children: React.ReactNode; } & any> = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
  return (
    <>
    
    <button  onClick={handleOpenModal} className="flex space-x-1 items-center font-bold text-xs px-4 md:px-5 py-1.5 text-white rounded bg-green-600 hover:bg-green-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1.5  w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
  
      Data
    </button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        {content}
      </Modal>
    </>
  );
};

export default BtnData;

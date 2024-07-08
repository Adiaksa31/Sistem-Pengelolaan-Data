'use client'
import React, { useState } from 'react';
import { HiOutlineExternalLink } from "react-icons/hi";
import ModalShow from "./mdlShow";


const BtnShowData: React.FC<{ children: React.ReactNode; } & any> = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);

  return (
    <>
    <button onClick={handleOpenModal} className='font-bold text-xs px-4 md:px-5 py-2 text-white rounded bg-D32124'>
    Lihat Detail
    </button>
      <ModalShow isOpen={isOpen} onClose={handleCloseModal}>
        {content}
      </ModalShow>
    </>
  );
};

export default BtnShowData;

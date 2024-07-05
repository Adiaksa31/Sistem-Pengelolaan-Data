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
    <button onClick={handleOpenModal} className='rounded p-2 text-black'>
    <HiOutlineExternalLink size={18}/>
    </button>
      <ModalShow isOpen={isOpen} onClose={handleCloseModal}>
        {content}
      </ModalShow>
    </>
  );
};

export default BtnShowData;

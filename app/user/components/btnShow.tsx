'use client'
import React, { useState } from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";
import ModalShow from "./mdlShow";


const BtnShowData: React.FC<{ children: React.ReactNode; } & any> = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);

  return (
    <>
    <button onClick={handleOpenModal} className='rounded p-2 text-black'>
    <FaExternalLinkAlt size={12}/>
    </button>
      <ModalShow isOpen={isOpen} onClose={handleCloseModal}>
        {content}
      </ModalShow>
    </>
  );
};

export default BtnShowData;

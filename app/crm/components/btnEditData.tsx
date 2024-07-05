'use client'
import React, { useState } from 'react';
import { IoPencil } from "react-icons/io5";
import ModalEdit from "../components/mdlEdit";


const BtnEditData: React.FC<{ children: React.ReactNode; } & any> = ({ content, formSubmitEdt, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
      setIsOpen(false);
      onClose();
    };

    const handleformSubmitEdt = async (data: any) => {
      try {
        const response = await formSubmitEdt(data);
        if (response.ok) {
          handleCloseModal();
        } else {
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  return (
    <>
    <button onClick={handleOpenModal} className='rounded text-white bg-yellow-600 hover:bg-yellow-700 p-2'>
    <IoPencil />
    </button>
      <ModalEdit isOpen={isOpen} onClose={handleCloseModal} onSubmit={handleformSubmitEdt}>
        {content}
      </ModalEdit>
    </>
  );
};

export default BtnEditData;

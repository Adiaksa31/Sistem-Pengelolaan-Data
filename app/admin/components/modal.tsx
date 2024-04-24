import React from 'react'; 


const Modal: React.FC<{ children: React.ReactNode; } & any> = ({ children, isOpen, onClose}) => {
    if (!isOpen) return null;
  return (
    <>
    <div className="fixed inset-0 z-50 overflow-y-auto px-4 sm:px-6">
      <div
        className="fixed inset-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm transition-duration-300 ease-in-out"
        onClick={onClose}
      />
      <div className="relative bg-tranparent flex items-center justify-center py-10">
        <div className="w-full  max-w-md p-4 bg-white rounded-xl shadow-lg overflow-auto">{children}
        {onClose && (
          <button
            className="mt-4 px-4 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
        )}</div>
       
      </div>
    </div>
    </>
  );
};

export default Modal;

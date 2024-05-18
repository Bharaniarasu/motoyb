import React from "react";

const CustomModal = ({ open, onClose, children }) => {
  return (
    <div
      className={`${
        open ? "visible bg-[#00000077] z-20" : "invisible"
      } fixed inset-0 flex justify-center items-center transition-colors `}
      onClick={onClose}
    >
      <div
        className={`min-w-[30rem] bg-white shadow-xl rounded-xl p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomModal;

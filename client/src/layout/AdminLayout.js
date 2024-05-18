import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaIndent, FaOutdent } from "react-icons/fa";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const closeSidebar = useCallback(() => {
    if (window.innerWidth < 680 && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);
  useEffect(() => {
    window.addEventListener("resize", closeSidebar);
    return () => {
      window.removeEventListener("resize", closeSidebar);
    };
  }, [isOpen, closeSidebar]);

  return (
    <>
      {location.pathname !== "/login" && (
        <>
          <div
            className={`fixed h-screen bg-[#2865ac] text-white   top-0 ${
              isOpen ? "w-60 left-0" : "w-0 left-[-15rem]"
            }  `}
          >
            <Sidebar isOpen={isOpen} />
          </div>

          <div
            className={`p-4 z-[1] cursor-pointer text-2xl bg-[#2865ac] text-white rounded-e-xl fixed top-2 ${
              isOpen ? "left-60 ps-0" : "left-0 ps-1"
            }  `}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaOutdent /> : <FaIndent />}
          </div>
        </>
      )}
      <div
        className={`${
          isOpen && location.pathname !== "/login" ? "ms-60" : "ms-0"
        }  h-screen `}
      >
        {children}
      </div>
    </>
  );
};

export default AdminLayout;

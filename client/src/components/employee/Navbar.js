import React, { useState } from "react";
import icon from "../../assets/images/icon.png";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/UserActions";
import { LuMenu } from "react-icons/lu";

const Navbar = () => {
  const [collapse, setCollapse] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout);
  };
  return (
    <nav className=" border-gray-200 bg-[#2865ac]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={icon} className="h-8" alt=" Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Moto<span className="text-orange-600 font-bold text-3xl">yb</span>
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => {
            setCollapse(!collapse);
          }}
        >
          <span className="sr-only">Open main menu</span>
          <LuMenu className="text-2xl font-bold" />
        </button>
        <div
          className={`${collapse ? "" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0  "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-950 md:p-0  "
              >
                Engineers
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-950 md:p-0  "
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-950 md:p-0  "
              >
                Equipments
              </a>
            </li>
            <li>
              <button
                href="/"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-950 md:p-0  "
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

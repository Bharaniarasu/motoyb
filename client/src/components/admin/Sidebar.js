import { useState } from "react";
import icon from "../../assets/images/icon.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { TbReport } from "react-icons/tb";
import { GoOrganization } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { BsTools } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/UserActions";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout);
  };
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center p-5">
        <Link to="/">
          <div className="font-bold text-2xl text-[#ffffff] tracking-[1px] ">
            Moto<span className="text-orange-400">yb</span>
          </div>
        </Link>
        <img className="h-[40px] w-[60px]" src={icon} alt="logo" />
      </div>
      <nav className={`h-full flex flex-col pt-4 `}>
        <div className="flex flex-col gap-6">
          <Link to="/">
            <div className=" py-2.5 px-4 hover:bg-white  hover:font-bold  hover:ps-7 hover:text-black flex gap-6 items-center hover:transition duration-500 ease-linear">
              <IoHome className="text-2xl" />
              Dashboard
            </div>
          </Link>
          <Link to="/">
            <div className=" py-2.5 px-4 hover:bg-white  hover:font-bold  hover:ps-7 hover:text-black flex gap-6 items-center hover:transition duration-500 ease-linear">
              <HiUsers className="text-2xl" />
              Engineers
            </div>
          </Link>
          <Link to="/attendance">
            <div className=" py-2.5 px-4 hover:bg-white  hover:font-bold hover:ps-7 hover:text-black flex gap-6 items-center hover:transition duration-500 ease-linear">
              <TbReport className="text-2xl" />
              Attendence Report
            </div>
          </Link>
          <Link to="/">
            <div className=" py-2.5 px-4 hover:bg-white hover:ps-7  hover:font-bold  hover:text-black flex gap-6 items-center hover:transition duration-500 ease-linear">
              <GoOrganization className="text-2xl" />
              Branches
            </div>
          </Link>
          <Link to="/">
            <div className=" py-2.5 px-4   hover:font-bold  hover:text-black flex gap-6 items-center hover:transition duration-500 ease-linear hover:ps-7 hover:bg-white">
              <TbReportAnalytics className="text-2xl" />
              Equipments
            </div>
          </Link>
        </div>
        <button
          className=" hover:font-bold relative   px-4 py-3 mt-20 flex gap-14 items-center justify-end w-full text-white   hover:bg-[#ffffff] hover:text-black hover:transition duration-500 ease-linear"
          onClick={handleLogout}
        >
          Logout <IoMdLogOut className="text-3xl" />
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;

import React from "react";
import Navbar from "../components/employee/Navbar";

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default UserLayout;

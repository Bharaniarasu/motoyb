import React from "react";
import Navbar from "./Navbar";
import SelectBike from "./SelectBike";
import UserLayout from "../../layout/UserLayout";

const HomeUser = () => {
  return (
    <UserLayout>
      <SelectBike />
    </UserLayout>
  );
};

export default HomeUser;

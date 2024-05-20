import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import ProtectedRoute, {
  ValidateAdmin,
  ValidateUser,
  fetchUserData,
} from "./ProtectedRouter";
import HomeAdmin from "../components/admin/Home";
import HomeUser from "../components/employee/Home";
import Process from "../components/employee/Process";
import UserLayout from "../layout/UserLayout";
import { useUser } from "../services/UserContext";

const HomeComponent = () => {
  const { userData, loading } = useUser();

  //Need to check role
  switch (userData.role) {
    case "admin":
      return <HomeAdmin />;
    case "user":
      return <HomeUser />;
    default:
      return null;
  }
};

const AppRouter = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomeComponent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ValidateAdmin>
              <HomeAdmin />
            </ValidateAdmin>
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/bikes/:id"
        element={
          <ProtectedRoute>
            <ValidateUser>
              <UserLayout>
                <Process />
              </UserLayout>
            </ValidateUser>
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <div className=" font-bold h-screen flex flex-col items-center justify-center">
            <div className="text-7xl ">404</div>
            <div className="">Page Not Found</div>
            <button
              className="mt-2 p-1 px-2 border-2 border-blue-600 text-blue-600 rounded-md"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRouter;

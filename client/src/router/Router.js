import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import ProtectedRoute from "./ProtectedRouter";
import HomeAdmin from "../components/admin/Home";
import HomeUser from "../components/employee/Home";
import Process from "../components/employee/Process";
import UserLayout from "../layout/UserLayout";
import { useState } from "react";

const HomeComponent = ({ role }) => {
  if (role === "admin") {
    return <HomeAdmin />;
  }
  if (role === "user") {
    return <HomeUser />;
  }
};
const Router = () => {
  const [role, setRole] = useState();

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ProtectedRoute
            roles={["admin", "user"]}
            roleHandler={(val) => setRole(val)}
          >
            <HomeComponent role={role} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/dashboard"
        element={
          <ProtectedRoute
            roles={["admin", "user"]}
            roleHandler={(val) => setRole(val)}
          >
            <HomeComponent role={role} />
          </ProtectedRoute>
        }
      />
      <Route exact path="/login" element={<Login />} />
      {/* <Route
        exact
        path="/bikes"
        element={
          <ProtectedRoute roles={["user", "admin"]}>
            <HomeUser />
          </ProtectedRoute>
        }
      /> */}
      <Route
        exact
        path="/bikes/:id"
        element={
          <ProtectedRoute
            roles={["user", "admin"]}
            roleHandler={(val) => setRole(val)}
          >
            <UserLayout>
              <Process />
            </UserLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;

import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useUser } from "../services/UserContext";

export const ValidateAdmin = ({ children }) => {
  const { userData, loading } = useUser();
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  return userData.role === "admin" ? (
    children
  ) : (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="font-bold text-2xl text-red-600">Access Denied</div>

      <button
        className="mt-2 p-1 px-2 border-2 border-blue-600 text-blue-600 rounded-md"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );
};

export const ValidateUser = ({ children }) => {
  const { userData, loading } = useUser();
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  return userData.role === "user" ? (
    children
  ) : (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="font-bold text-2xl text-red-600">Access Denied</div>
      <button
        className="mt-2 p-1 px-2 border-2 border-blue-600 text-blue-600 rounded-md"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );
};
const ProtectedRoute = ({ children }) => {
  const { userData, loading } = useUser();

  if (loading) {
    return <Loader />;
  }

  return userData ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const fetchData = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/user`,
      { withCredentials: true }
    );
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
const ProtectedRoute = ({ children, roles = [], roleHandler }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState();

  roleHandler(role);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { user } = await fetchData();
        // setAuthenticated(result);
        console.log(user);
        if (user) {
          // Assuming userData contains a role property
          const { role } = user;
          setRole(role);
          const hasRequiredRole = roles.includes(role);
          setAuthenticated(hasRequiredRole);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAuthenticated(false); // Set authenticated to false in case of error
      } finally {
        setLoading(false); // Set loading to false
      }
    };
    checkAuthentication();
  }, [roles]);
  if (loading) {
    // Render a loading indicator
    return <Loader />;
  }
  return authenticated ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;

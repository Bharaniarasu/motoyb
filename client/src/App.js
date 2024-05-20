import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "./router/Router";
import { useUser } from "./services/UserContext";
import Loader from "./components/Loader";

const App = () => {
  const { userData, loading } = useUser();

  return (
    <BrowserRouter>
      <ToastContainer theme="dark" position="top-right" />
      <Router />
    </BrowserRouter>
  );
};

export default App;

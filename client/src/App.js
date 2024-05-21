import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "./router/Router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./store/actions/UserActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser);
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ToastContainer theme="dark" position="top-right" />
      <Router />
    </BrowserRouter>
  );
};

export default App;

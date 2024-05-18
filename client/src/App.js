import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "./router/Router";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer theme="dark" position="top-right" />
      <Router />
    </BrowserRouter>
  );
};

export default App;

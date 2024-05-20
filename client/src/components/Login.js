import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login_image from "../assets/images/Login_icon.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const showSnackbar = (message, type) => {
    setSnackbar({ message, type });
    setTimeout(() => setSnackbar({ message: "", type: "" }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/user/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        if (response.data.user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
        showSnackbar(response.data.message, "success");
      }
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
        showSnackbar(
          error.response.data.message || "An error occurred",
          "error"
        );
      } else {
        console.error("Login failed:", error.message);
        showSnackbar(error.message, "error");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-[#7FB1E0] min-h-screen flex justify-center items-center flex-col gap-8 sm:gap-10">
      <div className="bg-[#fafafa77] max-w-[95vw] sm:max-w-[85vw] md:max-w-[75vw] h-auto sm:h-[60vh] md:h-[70vh] flex flex-col sm:flex-row justify-evenly items-center p-4 sm:p-6 rounded-3xl shadow-2xl">
        {/* <legend className="text-2xl sm:text-right text-center sm:text-xl md:text-2xl font-medium text-[#fff] bg-[#7FB1E0] p-3 rounded-2xl  border border-[#fafafa77] relative sm:right-40 md:right-28">LOG IN</legend> */}
        <div className="w-full sm:w-[50%] md:w-[40%] flex justify-center items-center p-2">
          <img
            src={Login_image}
            alt="Login Hero"
            className="h-auto w-full max-h-[250px] sm:max-h-[350px] md:max-h-full object-cover "
          />
        </div>
        <div className="w-full sm:w-[50%] md:w-[50%]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-3 sm:gap-4 md:gap-6 w-full max-w-sm sm:max-w-md mx-auto p-4"
          >
            <h4 className="text-xl sm:text-3xl md:text-4xl font-medium text-[#44b3f3] text-center">
              Login
            </h4>
            <input
              className="form-input h-[48px] focus:outline-none border px-3 rounded-xl"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                className="form-input h-[48px] focus:outline-none border px-3 w-full rounded-xl"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ">
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="text-gray-400 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </span>
            </div>
            <a className="text-xs text-blue-500 text-right hover:cursor-pointer ">
              forgot password?
            </a>
            <button
              type="submit"
              className="btn-submit bg-[#7FB1E0] text-white py-2 sm:py-3 hover:bg-[#4c8ecc] rounded-xl"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {snackbar.message && (
        <div
          className={`absolute bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded shadow-md text-white ${
            snackbar.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {snackbar.message}
        </div>
      )}
      {/* <div className="bg-white text-center p-2 sm:p-3 md:p-4 w-full sm:w-[85vw] md:w-[75vw] rounded text-xs sm:text-sm md:text-base">
                © Copyrights 2024 All Information used or mentioned in this application is copyrighted and Intellectual property of XXXX
            </div> */}
    </div>
  );
};

export default Login;

import axios from "axios";
import {
  loadUserFailed,
  loadUserRequest,
  loadUserSuccess,
  loginFailed,
  loginRequest,
  loginSuccess,
  logoutFailed,
  logoutSuccess,
} from "../slices/AuthSlice";

//Login action controller
export const login = (email, password) => async (dispatch) => {
  let uri = `${process.env.REACT_APP_SERVER_URL}/api/v1/user/login`;
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(
      uri,
      { email, password },
      { withCredentials: true }
    );
    //console.log(data);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailed(error.response.data.message));
  }
};

//Load Logged in user Data
export const loadUser = async (dispatch) => {
  let uri = `${process.env.REACT_APP_SERVER_URL}/api/v1/user`;
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/user`,
      { withCredentials: true }
    );
    // console.log(data);
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFailed(error.response.data.message));
  }
};

//log out Action Controller
export const logout = async (dispatch) => {
  let uri = `${process.env.REACT_APP_SERVER_URL}/api/v1/user/logout`;
  try {
    await axios.get(uri, { withCredentials: true });
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailed(error.response.data.message));
  }
};

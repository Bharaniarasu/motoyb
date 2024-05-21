import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "authentication",
  initialState: { loading: true, isAuthenticated: false },
  reducers: {
    loginRequest: (state, action) => {
      return { ...state, loading: true };
    },
    loginSuccess: (state, action) => {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loginFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    loadUserRequest: (state, action) => {
      return { ...state, isAuthenticated: false, loading: true };
    },
    loadUserSuccess: (state, action) => {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loadUserFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    logoutSuccess: (state, action) => {
      return {
        loading: false,
        isAuthenticated: false,
      };
    },
    logoutFailed: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = AuthSlice;
export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  loadUserFailed,
  loadUserRequest,
  loadUserSuccess,
  logoutSuccess,
  logoutFailed,
} = actions;
export default reducer;

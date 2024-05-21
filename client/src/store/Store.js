import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/AuthSlice";

const reducer = combineReducers({
  AuthState: AuthReducer,
});
export default configureStore({
  reducer,
});

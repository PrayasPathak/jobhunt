import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UsersSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});

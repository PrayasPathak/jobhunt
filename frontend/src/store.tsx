import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UsersSlice";
import profileReducer from "./Slices/ProfileSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

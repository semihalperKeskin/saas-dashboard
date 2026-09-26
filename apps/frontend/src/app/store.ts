import { configureStore } from "@reduxjs/toolkit";
import columnReducer from "~/features/boardSlice";
import userReducer from "~/features/userSlice";
import authReducer from "~/features/authSlice";

export const store = configureStore({
  reducer: {
    column: columnReducer,
    user: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

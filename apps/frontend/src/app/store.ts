import { configureStore } from "@reduxjs/toolkit";
import Column from "~/features/boardSlice";
import User from "~/features/userSlice";

export const store = configureStore({
  reducer: {
    column: Column,
    user: User,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

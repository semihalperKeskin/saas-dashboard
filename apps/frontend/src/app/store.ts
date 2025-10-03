import { configureStore } from "@reduxjs/toolkit";
import Column from "~/features/boardSlice";

export const store = configureStore({
  reducer: {
    column: Column,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

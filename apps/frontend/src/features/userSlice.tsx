import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInput } from "@vizionboard/validation";
import apiClient from "~/api/client";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, thunkAPI) => {
    const response = await apiClient("/api/user/me", {
      method: "GET",
    });
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Failed to fetch users");
    }
    const result = await response.json();
    return result;
  },
);

interface UserState {
  entities: UserInput | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UserState = {
  entities: {} as UserInput,
  loading: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInput>) => {
      state.entities = action.payload;
    },
    clearUser: (state) => {
      state.entities = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

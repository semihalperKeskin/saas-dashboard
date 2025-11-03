import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInput } from "@vizionboard/validation";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, thunkAPI) => {
    const response = await fetch("/api/user/me", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Failed to fetch users");
    }
    const result = await response.json();
    return result;
  }
);

interface UserState {
  entities: UserInput;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UserState = {
  entities: {} as UserInput,
  loading: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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

export default userSlice.reducer;

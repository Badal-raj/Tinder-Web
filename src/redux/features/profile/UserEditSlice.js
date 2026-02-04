import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ApiFetch } from "../../../utills/fetchApiWrapper";

const initialState = {
  loading: false,
  error: "",
};

export const handleUpdateUser = createAsyncThunk(
  "user-edit",
  async (formData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      return await ApiFetch(
        "http://localhost:9001/api/update/me",
        {
          method: "PATCH",
          body: formData,
        },
        thunkAPI, // ✅ REQUIRED
      );
    } catch (error) {
      if (!error?.status) {
        return rejectWithValue("Network error. Failed to fetch data.");
      }

      if (error.status === 401) {
        return rejectWithValue("Session expired. Please login again.");
      }

      if (error.status === 403) {
        return rejectWithValue("You are not allowed to perform this action.");
      }

      if (error.status >= 400 && error.status < 500) {
        return rejectWithValue(
          error.message || "Invalid request. Please check your input.",
        );
      }

      if (error.status >= 500) {
        return rejectWithValue("Server error. Please try again later.");
      }

      return rejectWithValue(error.message);
    }
  },
);

const userEditDetailsSlice = createSlice({
  name: "user-data",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleUpdateUser.pending, (state) => {
        state.loading = true;
        //state.error = "";
      })
      .addCase(handleUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(handleUpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userEditDetailsSlice.reducer;

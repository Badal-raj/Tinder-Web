// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { ApiFetch } from "../../../utills/fetchApiWrapper";
// const initialState = {
//   loading: false,
//   error: "",
// };

// export const hangeGetUserDetails = createAsyncThunk(
//   "user-profile",
//   async (_, { rejectWithValue }) => {
//     try {
//       return await ApiFetch("http://localhost:9001/api/view-profile", {
//         method: "GET",
//       });
//     } catch (error) {
//       if (error.message === "Network Error") {
//         return rejectWithValue("Network error, please check your server.");
//       } else if (error.message === "Failed to fetch") {
//         return rejectWithValue("Server error, please check your support team.");
//       }
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const userDetailSlice = createSlice({
//   name: "user-data",
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(hangeGetUserDetails.pending, (state) => {
//         state.loading = true;
//         state.error = "";
//       })
//       .addCase(hangeGetUserDetails.fulfilled, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(hangeGetUserDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default userDetailSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiFetch } from "../../../utills/fetchApiWrapper";

const initialState = {
  loading: false,
  error: "",
};

export const hangeGetUserDetails = createAsyncThunk(
  "user-profile",
  async (_, thunkAPI) => {
    try {
      return await ApiFetch("http://localhost:9001/api/view-profile",{
          method: "GET",
        },
        thunkAPI,
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const userDetailSlice = createSlice({
  name: "user-data",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(hangeGetUserDetails.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(hangeGetUserDetails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(hangeGetUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetailSlice.reducer;

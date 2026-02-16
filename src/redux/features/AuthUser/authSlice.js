import { createSlice } from "@reduxjs/toolkit";
import { handleUpdateUser } from "../profile/UserEditSlice";
import { hangeGetUserDetails } from "../profile/ProfileSlice";

const initialState = {
  accessToken: sessionStorage.getItem("auth-token") || null,
  isSessionExpired: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.user = user;
      sessionStorage.setItem("auth-token", accessToken);
    },
    logoutAction: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isSessionExpired = false;
      sessionStorage.removeItem("auth-token");
    },
    sessionExpired: (state) => {
      // state.accessToken = null;
      // state.user = null;
      state.isSessionExpired = true;
      sessionStorage.removeItem("auth-token");
    },
    resetSession: (state) => {
       state.isSessionExpired = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hangeGetUserDetails.fulfilled, (state, action) => {
        state.user = action.payload.result; // 👈 store profile here
      })
      .addCase(handleUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload.result; // 👈 update here too
      });
  },
});

export const { setCredentials, logoutAction, sessionExpired, resetSession } = authSlice.actions;
export default authSlice.reducer;

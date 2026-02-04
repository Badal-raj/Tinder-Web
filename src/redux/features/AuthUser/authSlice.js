import { createSlice } from "@reduxjs/toolkit";
import { handleUpdateUser } from "../profile/UserEditSlice";
import { hangeGetUserDetails } from "../profile/ProfileSlice";

const initialState = {
  accessToken: sessionStorage.getItem("auth-token") || null,
  refreshToken:  sessionStorage.getItem("refresh-token") || null,
  isSessionExpired: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;
      sessionStorage.setItem("auth-token", accessToken);
      sessionStorage.setItem("refresh-token", refreshToken);
    },
    logoutAction: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isSessionExpired = false;
      sessionStorage.clear();
    },
    sessionExpired: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isSessionExpired = true;
      sessionStorage.clear();
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

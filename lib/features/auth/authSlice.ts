import { createSlice } from "@reduxjs/toolkit";
import { signUp, logout } from "./authThunk";
import {  TokenValidity, User } from "@/types/auth.interface";


interface AuthenticationState {
  user: undefined | User;
  errorMessage: string;
  token: undefined | string;
  otpPrefix: string | undefined;
  otpExpiresAt: string | undefined;
  logoutLoading: boolean;
}

const initialState: AuthenticationState = {
  user: undefined,
  errorMessage: "",
  token: undefined,
  otpPrefix: undefined,
  otpExpiresAt: undefined,
  logoutLoading: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    updateUserInfo: (state, { payload }) => {
      state.user = payload;
    },
    updateTokenValidity: (state, { payload }) => {
      const { otpPrefix, otpExpiresAt, token } = payload as TokenValidity;
      state.token = token;
      if(otpPrefix && otpExpiresAt) {
        state.otpPrefix = otpPrefix;
        state.otpExpiresAt = otpExpiresAt;
      }
    },
    clearAuth: (state) => {
      state.user = undefined;
      state.token = undefined;
      state.otpPrefix = undefined;
      state.otpExpiresAt = undefined;
      state.errorMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.errorMessage = "";
      })
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
        state.errorMessage = "";
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutLoading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.logoutLoading = false;
      });
  },
});

export const { setErrorMessage, updateUserInfo, updateTokenValidity, clearAuth } = authSlice.actions;
export default authSlice.reducer;

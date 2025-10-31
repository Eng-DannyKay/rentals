import axios, { axiosErrorHandler } from "@/lib/axios";
import {
  ISignUp,
  ISignUpResponse,
  IVerifyResponse,
  Otp,
} from "@/types/auth.interface";
import { IResponse } from "@/types/shared.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateTokenValidity, updateUserInfo, clearAuth } from "./authSlice";
import { MESSAGES } from "@/constants/constants";

const authPath = "authentication/" as const;

export const signUp = createAsyncThunk(
  "authentication/signUp",
  async (signUpCredentials: ISignUp, { dispatch }) => {
    try {
      const { data } = await axios.post<IResponse<ISignUpResponse>>(
        `${authPath}signup`,
        signUpCredentials
      );
      dispatch(updateTokenValidity(data.data));
      return MESSAGES.signUpSuccess;
    } catch (error) {
      return axiosErrorHandler(error, true);
    }
  }
);

export const verifyCode = createAsyncThunk(
  "authentication/verifyCode",
  async (otp: Otp, { dispatch }) => {
    try {
      const { data } = await axios.post<IResponse<IVerifyResponse>>(
        `${authPath}verify-otp`,
        
          otp,
        
      );
      dispatch(updateUserInfo(data.data.user));
      dispatch(updateTokenValidity(data.data));
      return data.message;
    } catch (error) {
      return axiosErrorHandler(error, true);
    }
  }
);



export const signIn = createAsyncThunk(
  "authentication/signIn",
  async (phoneNumber: string, { dispatch }) => {
    try {
      const { data } = await axios.post<IResponse<ISignUpResponse>>(
        `${authPath}signin`,
        {phoneNumber}
      );
      dispatch(updateTokenValidity(data.data));
      return MESSAGES.signUpSuccess;
    } catch (error) {
      return axiosErrorHandler(error, true);
    }
  }
);


export const resendCode = createAsyncThunk(
  "authentication/resendCode",
  async (_,{ dispatch }) => {
    try {
      const { data } = await axios.post<IResponse<IVerifyResponse>>(
        `${authPath}resend-otp`,
      );
      dispatch(updateTokenValidity(data.data));
      return data.message;
    } catch (error) {
      return axiosErrorHandler(error, true);
    }
  }
);

export const logout = createAsyncThunk(
  "authentication/logout",
  async (_, { dispatch }) => {
    try {
      const { data } = await axios.post<IResponse<IVerifyResponse>>(
        `${authPath}logout`,
      );
      dispatch(clearAuth());
      return data.message;
    } catch (error) {
      return axiosErrorHandler(error, true);
    }
  }
);

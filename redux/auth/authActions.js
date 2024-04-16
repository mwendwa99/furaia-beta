import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  setLoading,
  setError,
  setUser,
  clearError,
  setOtp,
} from "./authReducer";
import {
  LoginApi,
  RegisterApi,
  ResetPinApi,
  ForgotPinApi,
  RequestOtp,
  ChangePassword,
  VerifyOtp,
  LogoutApi,
  GetUserApi,
  UpdateProfileApi,
} from "../../services/auth.service";

export const login = createAsyncThunk(
  "auth/login",
  ({ mobile, password }, { rejectWithValue }) => {
    try {
      return LoginApi({ mobile, password });
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  (otp, { rejectWithValue }) => {
    try {
      return VerifyOtp(otp);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const requestOtp = createAsyncThunk(
  "auth/requestOtp",
  (mobile, { rejectWithValue }) => {
    try {
      return RequestOtp(mobile);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  (token, { rejectWithValue }) => {
    try {
      return GetUserApi(token);
    } catch (error) {
      rejectWithValue(error);
      return error;
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  ({ data, token }, { rejectWithValue }) => {
    try {
      return UpdateProfileApi(data, token);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  (_, { rejectWithValue }) => {
    try {
      return LogoutApi();
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  (data, { rejectWithValue }) => {
    try {
      return RegisterApi(data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const forgotPin = createAsyncThunk(
  "auth/forgotPin",
  (data, { rejectWithValue }) => {
    try {
      return ForgotPinApi(data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const resetPin = createAsyncThunk(
  "auth/resetPin",
  (data, { rejectWithValue }) => {
    try {
      return ResetPinApi(data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// export const forgotPin = createAsyncThunk(
//   "auth/forgotPin",
//   async (data, { dispatch }) => {
//     try {
//       dispatch(setLoading(true));
//       const response = await ForgotPinApi(data);
//       dispatch(setOtp(response.otp));
//       dispatch(clearError());
//       dispatch(setLoading(false));
//     } catch (error) {
//       dispatch(setError(error));
//     }
//   }
// );

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await ChangePassword(data);
      dispatch(clearError());
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(
        setError({
          code: error.code,
          message: error.message,
          origin: "changePassword",
        })
      );
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ mobile, password }, { rejectWithValue }) => {
    try {
      // Make API request to login
      const response = await axios.post(
        "https://sapient.stackthon.com/api/login",
        {
          mobile,
          password,
        }
      );
      // Extract access token from response
      const accessToken = response.data.token;
      // Save access token to AsyncStorage
      await AsyncStorage.setItem("accessToken", accessToken);
      // Return the response data
      return response.data;
    } catch (error) {
      // Handle error
      return rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
      // return rejectWithValue(error);
    }
  }
);

export const verifyOtp = createAsyncThunk(async (otp, { rejectWithValue }) => {
  try {
    const response = await api.post("verify-otp", {
      otp,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error.response.data.detail,
      status: error.response.status,
    });
  }
});

export const requestOtp = createAsyncThunk(
  "auth/requestOtp",
  async (mobile, { rejectWithValue }) => {
    try {
      const response = await api.post("request-otp", {
        mobile,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("user");
      return data;
    } catch (error) {
      rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.patch("user", data);
      return response.data;
    } catch (error) {
      rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("logout");
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

export const resetPin = createAsyncThunk(
  "auth/resetPin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("reset", data);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

export const forgotPin = createAsyncThunk(
  "auth/forgotPin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("forgot", data);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("change-password", data);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("register", data);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

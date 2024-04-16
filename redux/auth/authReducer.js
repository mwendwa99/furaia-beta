import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  roles: null,
  loading: false,
  error: null,
  isVerified: false,
  token: null,
  otp: null,
  pinReset: false,
  expoPushToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setExpoPushToken: (state, action) => {
      state.expoPushToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("auth/login/pending", (state) => {
        state.loading = true;
      })
      .addCase("auth/login/fulfilled", (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.otp = action.payload.otp;
      })
      .addCase("auth/login/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("auth/verifyOtp/pending", (state) => {
        state.loading = true;
      })
      .addCase("auth/verifyOtp/fulfilled", (state, action) => {
        state.loading = false;
        state.isVerified = true;
      })
      .addCase("auth/verifyOtp/rejected", (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase("auth/requestOtp/pending", (state) => {
        state.loading = true;
      })
      .addCase("auth/requestOtp/fulfilled", (state, action) => {
        state.loading = false;
        state.otp = action.payload.otp;
      })
      .addCase("auth/requestOtp/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("auth/getUser/pending", (state) => {
        state.loading = true;
      })
      .addCase("auth/getUser/fulfilled", (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase("auth/getUser/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("auth/logout/pending", (state) => {
        state.loading = true;
      })
      .addCase("auth/logout/fulfilled", (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isVerified = false;
        state.otp = null;
      })
      .addCase("auth/logout/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("auth/updateProfile/pending", (state) => {
        state.loading = true;
      })
      .addCase("auth/updateProfile/fulfilled", (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase("auth/updateProfile/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("auth/register/pending", (state) => {
        state.loading = true;
      })
      .addCase("auth/register/fulfilled", (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase("auth/register/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("auth/resetPin/pending", (state) => {
        state.loading = true;
      })
      .addCase("auth/resetPin/fulfilled", (state, action) => {
        state.loading = false;
        state.pinReset = true;
      })
      .addCase("auth/resetPin/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("auth/forgotPin/pending", (state) => {
        state.loading = true;
      })
      .addCase("auth/forgotPin/fulfilled", (state, action) => {
        state.loading = false;
        state.otp = action.payload.otp;
      })
      .addCase("auth/forgotPin/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setExpoPushToken } = authSlice.actions;

export default authSlice.reducer;

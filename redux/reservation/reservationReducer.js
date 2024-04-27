import { getUserReservations, createReservation } from "./reservationActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userReservations: null,
  reservation: null,
  loading: false,
  error: null,
};

const billSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.userReservations = action.payload;
      })
      .addCase(getUserReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservation = action.payload;
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = billSlice.actions;

export default billSlice.reducer;

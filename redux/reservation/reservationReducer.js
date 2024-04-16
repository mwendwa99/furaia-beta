import { getAllReservations, createReservation } from "./reservationActions";
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.userReservations = action.payload;
      })
      .addCase(getAllReservations.rejected, (state, action) => {
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

export default billSlice.reducer;

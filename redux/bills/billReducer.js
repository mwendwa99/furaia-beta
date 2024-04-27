import { getAllBills, triggerPayment } from "./billActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBills: null,
  loading: false,
  error: null,
  payment: null,
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    clearPayment: (state) => {
      state.payment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBills.fulfilled, (state, action) => {
        state.loading = false;
        state.allBills = action.payload;
      })
      .addCase(getAllBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(triggerPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(triggerPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(triggerPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPayment } = billSlice.actions;

export default billSlice.reducer;

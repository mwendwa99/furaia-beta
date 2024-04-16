import { getAllBills } from "./billActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBills: null,
  loading: false,
  error: null,
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBills.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBills.fulfilled, (state, action) => {
        state.loading = false;
        state.allBills = action.payload;
      })
      .addCase(getAllBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default billSlice.reducer;

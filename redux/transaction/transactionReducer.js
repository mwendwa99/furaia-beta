import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  transactions: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase("transaction/getTransactions/pending", (state) => {
        state.loading = true;
      })
      .addCase("transaction/getTransactions/fulfilled", (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase("transaction/getTransactions/rejected", (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default transactionSlice.reducer;

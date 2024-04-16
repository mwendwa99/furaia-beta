import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetTransactionsApi } from "../../services/transaction.service";

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  (token, { rejectWithValue }) => {
    try {
      return GetTransactionsApi(token);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

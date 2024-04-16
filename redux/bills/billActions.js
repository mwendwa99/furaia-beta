import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetAllBillsApi } from "../../services/bill.service";

export const getAllBills = createAsyncThunk(
  "bills/getAllBills",
  (token, { rejectWithValue }) => {
    try {
      return GetAllBillsApi(token);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

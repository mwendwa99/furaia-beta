import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetPremiseId, GetTableNumber } from "../../services/premise.service";

export const getPremiseId = createAsyncThunk(
  "premise/getPremiseId",
  (data, { rejectWithValue }) => {
    try {
      const response = GetPremiseId(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPremiseTable = createAsyncThunk(
  "premise/getPremiseTable",
  (data, { rejectWithValue }) => {
    try {
      const response = GetTableNumber(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

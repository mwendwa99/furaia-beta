import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api.service";

export const getAllBills = createAsyncThunk(
  "bills/getAllBills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`bills`);

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

export const getBillsByStatus = createAsyncThunk(
  "bills/getBillsByStatus",
  async ({ outletId, status }, { rejectWithValue }) => {
    try {
      const response = await api.get(`bills/${outletId}`);
      const filteredBills =
        status === "All"
          ? response.data
          : response.data.filter((result) => result.bill_status === status);
      return filteredBills;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

export const triggerPayment = createAsyncThunk(
  "bills/triggerPayment",
  async (bill, { rejectWithValue }) => {
    try {
      const response = await api.post(`bills/pay`, bill);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

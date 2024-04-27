import { createAsyncThunk } from "@reduxjs/toolkit";

// import axios from "axios";
// import { prod } from "../../env";
import api from "../../services/api.service";

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async ({ storeNumber, token }, { rejectWithValue }) => {
    try {
      const response = await api.get(`orders/${storeNumber}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await api.get(`orders/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ orderData }, { rejectWithValue }) => {
    try {
      const response = await api.post("orders", orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.detail,
        status: error.response.status,
      });
    }
  }
);

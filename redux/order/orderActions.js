import { createAsyncThunk } from "@reduxjs/toolkit";

import { CreateOrderApi, GetOrdersApi } from "../../services/order.service";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  ({ data, token }, { rejectWithValue }) => {
    try {
      return CreateOrderApi(data, token);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/getOrders",
  (token, { rejectWithValue }) => {
    try {
      // console.log({ token });
      return GetOrdersApi(token);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  ({ id, token }, { rejectWithValue }) => {
    try {
      return GetOrderByIDApi(id, token);
    } catch (error) {
      rejectWithValue(error);
      return error;
    }
  }
);

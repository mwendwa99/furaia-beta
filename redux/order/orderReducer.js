import { createSlice } from "@reduxjs/toolkit";
import { getOrders, getOrderById, createOrder } from "./orderActions";

const initialState = {
  orders: null,
  loading: false,
  error: null,
  order: null,
  action: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetAction: (state) => {
      state.action = null;
    },
    resetOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { resetAction, resetOrder } = orderSlice.actions;

export default orderSlice.reducer;

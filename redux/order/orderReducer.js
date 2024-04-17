import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  orderSuccess: false,
  error: null,
  order: null,
  orders: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.orderSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("order/createOrder/pending", (state) => {
        state.loading = true;
      })
      .addCase("order/createOrder/fulfilled", (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.orderSuccess = true;
      })
      .addCase("order/createOrder/rejected", (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.orderSuccess = false;
      })
      .addCase("order/getOrders/pending", (state) => {
        state.loading = true;
      })
      .addCase("order/getOrders/fulfilled", (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })
      .addCase("order/getOrders/rejected", (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase("order/getOrderById/pending", (state) => {
        state.loading = true;
      })
      .addCase("order/getOrderById/fulfilled", (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase("order/getOrderById/rejected", (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { resetSuccess } = orderSlice.actions;

export default orderSlice.reducer;

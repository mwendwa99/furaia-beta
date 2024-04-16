import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: null,
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase("menu/getMenu/pending", (state) => {
        state.loading = true;
      })
      .addCase("menu/getMenu/fulfilled", (state, action) => {
        state.loading = false;
        state.menu = action.payload;
      })
      .addCase("menu/getMenu/rejected", (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setLoading, setError, setMenu, clearMenu, clearError } =
  menuSlice.actions;
export default menuSlice.reducer;

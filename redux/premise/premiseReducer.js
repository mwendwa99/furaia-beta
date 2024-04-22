import { createSlice } from "@reduxjs/toolkit";
import { getPremiseTable, getPremiseId } from "./premiseActions";

const initialState = {
  tableNumber: null,
  premiseId: null,
  loading: false,
  error: null,
};

const premiseSlice = createSlice({
  name: "premise",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPremiseTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPremiseTable.fulfilled, (state, action) => {
        state.loading = false;
        state.tableNumber = action.payload;
      })
      .addCase(getPremiseTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPremiseId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPremiseId.fulfilled, (state, action) => {
        state.loading = false;
        state.premiseId = action.payload;
      })
      .addCase(getPremiseId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default premiseSlice.reducer;

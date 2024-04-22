import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetMenuApi } from "../../services/menu.service";

export const getMenu = createAsyncThunk(
  "menu/getMenu",
  async ({ storeNumber, token }, { rejectWithValue }) => {
    try {
      const result = await GetMenuApi(storeNumber, token);
      return result.data;
    } catch (error) {
      rejectWithValue(error); // <-- return rejection value
    }
  }
);

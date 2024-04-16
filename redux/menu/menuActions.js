import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetMenuApi } from "../../services/menu.service";

export const getMenu = createAsyncThunk(
  "menu/getMenu",
  ({ storeNumber, token }, { rejectWithValue }) => {
    try {
      return GetMenuApi(storeNumber, token); // <-- return menu payload
    } catch (error) {
      rejectWithValue(error); // <-- return rejection value
    }
  }
);

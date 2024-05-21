import { createAsyncThunk } from "@reduxjs/toolkit";

// import api from "../../services/api.service";
import { unprotectedApi } from "../../services/api.service";

export const getUserReservations = createAsyncThunk(
  "reserve/getUserReservations",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const reservations = await unprotectedApi.get(
        `user-reservations/${userId}`
      );
      return reservations.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createReservation = createAsyncThunk(
  "reserve/createReservation",
  async ({ data }, { rejectWithValue }) => {
    try {
      const reservation = await unprotectedApi.post("reservations", data);
      return reservation.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

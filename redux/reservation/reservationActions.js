import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api.service";

export const getUserReservations = createAsyncThunk(
  "reserve/getUserReservations",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const reservations = await api.get(`user-reservations/${userId}`);
      return reservations;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createReservation = createAsyncThunk(
  "reserve/createReservation",
  async ({ data }, { rejectWithValue }) => {
    try {
      const reservation = await api.post("reservations", data);
      return reservation;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

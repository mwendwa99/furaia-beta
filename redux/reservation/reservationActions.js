import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  CreateReservationApi,
  GetReservationsApi,
} from "../../services/reservation.service";

export const getUserReservations = createAsyncThunk(
  "reserve/getUserReservations",
  ({ token, userId }, { rejectWithValue }) => {
    try {
      const reservations = GetReservationsApi(token, userId);
      return reservations;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createReservation = createAsyncThunk(
  "reserve/createReservation",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const reservation = await CreateReservationApi(token, data);
      return reservation;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  CreateReservationApi,
  GetReservationsApi,
} from "../../services/reservation.service";

import api from "../../services/api.service";

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
  async ({ data }, { rejectWithValue }) => {
    try {
      const reservation = await api.post("reservations", data);
      return reservation;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

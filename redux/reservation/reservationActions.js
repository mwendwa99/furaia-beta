import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  CreateReservationApi,
  GetReservationsApi,
} from "../../services/reservation.service";

export const getAllReservations = createAsyncThunk(
  "reserve/getAllReservations",
  (token, { rejectWithValue }) => {
    try {
      return GetReservationsApi(token);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const createReservation = createAsyncThunk(
  "reserve/createReservation",
  (data, { rejectWithValue }) => {
    try {
      return CreateReservationApi(data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

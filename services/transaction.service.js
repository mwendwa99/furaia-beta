import axios from "axios";

import handleError from "./error";

import { prod } from "../env";

export const GetTransactionsApi = async (token) => {
  try {
    const { data } = await axios.get(prod.URL + `/api/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
};

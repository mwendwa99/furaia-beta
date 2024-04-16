import axios from "axios";

import handleError from "./error";

import { prod } from "../env";
const headers = {
  "Content-Type": "application/json",
};

export const GetMenuApi = async (storeNumber, token) => {
  try {
    const { data } = await axios.get(prod.URL + `/api/menu/${storeNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
};

import axios from "axios";
import handleError from "./error";
import { prod } from "../env";

export const CreateOrderApi = async (data, token) => {
  try {
    const response = await axios.post(prod.URL + `/api/orders`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // specify content type here
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const GetOrdersApi = async (token) => {
  try {
    const response = await axios.get(prod.URL + `/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const GetOrderByIDApi = async (id, token) => {
  try {
    const { data } = await axios.get(prod.URL + `/api/waiter/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

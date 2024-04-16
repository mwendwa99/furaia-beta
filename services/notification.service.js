// import messaging from "@react-native-firebase/messaging";
import axios from "axios";

import handleError from "./error";

import { prod } from "../env";

export const CreateFCMDevice = async (userData) => {
  try {
    // const fcmToken = await onAppBootstrap();

    const formData = new FormData();

    formData.append("fcm_token", userData.fcmToken);
    formData.append("name", userData.name);
    formData.append("mobile", userData.mobile);
    formData.append("type", userData.device_type);

    const { data } = await axios.post(prod.URL + "/api/device", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    return handleError(error);
  }
};

// import messaging from "@react-native-firebase/messaging";

import api from "./api.service";

export const CreateFCMDevice = async (userData) => {
  try {
    const response = await api.post("device", userData);
    return response.data;
  } catch (error) {
    return error;
  }
};

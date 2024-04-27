import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "https://sapient.stackthon.com/api/",
});

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    // Get the access token from AsyncStorage
    const accessToken = await AsyncStorage.getItem("accessToken");
    // If the access token is available, add it to the request headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Return a successful response directly
    return response;
  },
  async (error) => {
    // Handle 403 or 401 errors and refresh the token
    const originalRequest = error.config;
    if (error.response.status === 403 || error.response.status === 401) {
      // Perform token refresh and update the original request
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (refreshToken) {
        // Call your refresh token endpoint
        const refreshResponse = await instance.get("/refresh", {
          refresh_token: refreshToken,
        });
        const newAccessToken = refreshResponse.data.token;
        // Save the new access token to AsyncStorage
        await AsyncStorage.setItem("accessToken", newAccessToken);
        // Update the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // Retry the original request
        return instance(originalRequest);
      } else {
        // No refresh token available, redirect to login or handle the situation accordingly
        // return Promise.reject(error);
        // const refreshResponse = await instance.get("/refresh");
        const refreshResponse = await axios.get(
          "https://sapient.stackthon.com/api//refresh"
        );
        const newAccessToken = refreshResponse.data.token;
        await AsyncStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      }
    }
    // For other errors, just reject with the error
    return Promise.reject(error);
  }
);

export default instance;

import axios from "axios";

import handleError from "./error";

import { prod } from "../env";

const headers = {
  "Content-Type": "application/json",
};

const LoginApi = async (userLogin) => {
  try {
    const { data } = await axios.post(
      prod.URL + "/api/login",
      userLogin,
      headers
    );
    return data;
  } catch (err) {
    return handleError(err);
  }
};

const GetUserApi = async (token) => {
  try {
    const { data } = await axios.get(prod.URL + "/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

const LogoutApi = async () => {
  try {
    const message = await axios.get(prod.URL + "/api/logout");
    return message;
  } catch (error) {
    handleError(error);
  }
};

const RegisterApi = async (userData) => {
  try {
    const { data } = await axios.post(
      prod.URL + "/api/register",
      userData,
      headers
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const ResetPinApi = async (resetData) => {
  try {
    const { data } = await axios.post(
      prod.URL + "/api/reset",
      resetData,
      headers
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const ForgotPinApi = async (mobile) => {
  try {
    const { data } = await axios.post(
      prod.URL + "/api/forgot",
      mobile,
      headers
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const RequestOtp = async (mobile) => {
  try {
    const { data } = await axios.post(
      prod.URL + "/api/request-otp",
      mobile,
      headers
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const VerifyOtp = async (otp) => {
  try {
    const { data } = await axios.post(
      prod.URL + "/api/verify-otp",
      otp,
      headers
    );
    return data;
  } catch (err) {
    throw handleError(err);
  }
};

const RecoverAccountApi = async (email) => {
  try {
    const { data } = await axios.post(
      prod.URL + "/api/recover-account",
      email,
      headers
    );
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

const GetMenuApi = async (outletId) => {
  try {
    const { data } = await axios.get(prod.URL + `/api/menu/${outletId}`);
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

const UpdateProfileApi = async (userData, token) => {
  try {
    const { data } = await axios.patch(prod.URL + "/api/user", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
};

const ChangePassword = async (changePass) => {
  try {
    const { data } = await axios.post(
      prod + "/api/change-password",
      changePass,
      headers
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export {
  LoginApi,
  RegisterApi,
  ResetPinApi,
  ForgotPinApi,
  RequestOtp,
  ChangePassword,
  VerifyOtp,
  RecoverAccountApi,
  GetUserApi,
  LogoutApi,
  GetMenuApi,
  UpdateProfileApi,
};

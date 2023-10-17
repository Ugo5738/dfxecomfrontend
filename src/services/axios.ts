import Axios, { AxiosRequestConfig, AxiosError } from "axios";
import URLS from "./urls";
import { ErrorToast } from "../utils/toast";
import { clearAuthToken, getAuthToken, getAuthToken2 } from "../utils/auth";

interface ResponseType {
  detail: string;
  email: string;
  code: string;
  messages: Record<string, string>[];
}

const axios = Axios.create({
  baseURL: URLS.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosConfigurator = (config: AxiosRequestConfig) => {
  const token = getAuthToken();
  const token2 = getAuthToken2();

  if (token && token2) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token || token2}`,
    };
  }
  return config;
};

axios.interceptors.request.use(axiosConfigurator as never);

axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ResponseType>) => {
    if (error.code === "ERR_NETWORK") {
      return Promise.reject(new Error("You are not connected to the internet."));
    }
    if (error.response?.data?.detail) {
      ErrorToast(error.response.data.detail);
      if (error.response.data.detail === "Authentication credentials were not provided.") {
        clearAuthToken();

        window.location.href = `/login?redirectedFrom=${window.location.pathname}`;
      }
      if (error.response.data.code === "token_not_valid") {
        clearAuthToken();
        window.location.href = `/login?redirectedFrom=${window.location.pathname}`;
      }
      return null;
    } else if (error.response?.data?.email) {
      ErrorToast(error.response.data.email[0]);
      return null;
    } else {
      ErrorToast(error.message);
      return null;
    }
    return Promise.reject(error);
  },
);

export default axios;

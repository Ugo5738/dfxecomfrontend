/* eslint-disable no-console */
// import Axios, { AxiosRequestConfig, AxiosError } from "axios";
// import URLS from "./urls";
// import { ErrorToast } from "../utils/toast";
// import { clearAuthToken, getAuthToken } from "../utils/auth";

// interface ResponseType {
//   detail: string;
//   email: string;
//   code: string;
//   messages: Record<string, string>[];
// }

// const axios = Axios.create({
//   baseURL: URLS.API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const axiosConfigurator = (config: AxiosRequestConfig) => {
//   const token = getAuthToken();
//   if (token) {
//     config.headers = {
//       ...(config.headers ?? {}),
//       Authorization: `Bearer ${token}`,
//     };
//   }
//   return config;
// };

// axios.interceptors.request.use(axiosConfigurator as never);

// axios.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError<ResponseType>) => {
//     if (error.code === "ERR_NETWORK") {
//       return Promise.reject(new Error("You are not connected to the internet."));
//     }
//     if (error.response?.data?.detail) {
//       ErrorToast(error.response.data.detail);
//       if (error.response.data.detail === "Authentication credentials were not provided.") {
//         clearAuthToken();
//         window.location.href = `/login?redirectedFrom=${window.location.pathname}`;
//       }
//       if (error.response.data.code === "token_not_valid") {
//         clearAuthToken();
//         window.location.href = `/login?redirectedFrom=${window.location.pathname}`;
//       }
//       return null;
//     } else if (error.response?.data?.email) {
//       ErrorToast(error.response.data.email[0]);
//       return null;
//     } else {
//       ErrorToast(error.message);
//       return null;
//     }
//     return Promise.reject(error);
//   },
// );

// export default axios;

import Axios, { AxiosRequestConfig, AxiosError } from "axios";
import URLS from "./urls";
import { ErrorToast } from "../utils/toast";
import { clearAuthToken, getAuthRefreshToken, getAuthToken, setAuthToken } from "../utils/auth";

interface ResponseType {
  detail: string;
  email: string;
  code: string;
  messages: Record<string, string>[];
}

const apiBaseUrl = URLS.API_URL;

const axios = Axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosConfigurator = (config: AxiosRequestConfig) => {
  const token = getAuthToken();
  if (token) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

axios.interceptors.request.use(axiosConfigurator as never);

// Create a separate Axios instance for token refreshing
const refreshAxios = Axios.create({
  baseURL: apiBaseUrl,
});

const refreshConfigurator = (config: AxiosRequestConfig) => {
  config.headers = {
    "Content-Type": "application/x-www-form-urlencoded", // Adjust as needed
  };
  return config;
};

refreshAxios.interceptors.request.use(refreshConfigurator as never);

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
      } else if (error.response.data.code === "token_not_valid") {
        // Token is invalid, attempt to refresh it

        try {
          const response = await refreshAccessToken();
          const res = response?.data?.access as string;

          // Update the access token and retry the original request

          setAuthToken(res);
          error.config!.headers.Authorization = `Bearer ${res}`;
          return axios(error.config!);
        } catch (error) {
          if (error) {
            clearAuthToken();
            window.location.href = `/login?redirectedFrom=${window.location.pathname}`;
          }
          // Handle refresh token error, e.g., clearAuthToken() and redirect to login
        }
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
const refreshAccessToken = async () => {
  const refresh = getAuthRefreshToken();
  try {
    const response = await axios.post(URLS.REFRESH_TOKEN, {
      refresh,
    });

    return response;
  } catch (error) {
    console.error("Token refresh failed", error);
    return null;
  }
};
export default axios;

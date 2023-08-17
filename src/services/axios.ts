import Axios, { AxiosRequestConfig, AxiosError } from "axios";
import URLS from "./urls";
import { ErrorToast } from "../utils/toast";

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
    const token = sessionStorage.getItem("dfx-token");
    if (token) {
        config.headers = {
            ...(config.headers ?? {}),
            Authorization: `Bearer ${token}`,
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
                // sessionStorage.removeItem("dfx-token");
                // window.location.href = "/login";
            }
            if (error.response.data.code === "token_not_valid") {
                // sessionStorage.removeItem("dfx-token");
                // window.location.href = "/login";
            }
            return null;
        } else if (error.response?.data?.email) {
            ErrorToast(error.response.data.email[0]);
            return null;
        } else {
            ErrorToast(error.message);
        }
        return Promise.reject(error);
    },
);

export default axios;

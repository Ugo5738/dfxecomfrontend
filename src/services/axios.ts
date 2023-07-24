import Axios, { AxiosRequestConfig, AxiosError } from "axios";
import URLS from "./urls";
import { ErrorToast } from "../utils/toast";

interface ResponseType {
    detail: string;
    email: string;
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
        if (error.response?.data?.detail) {
            ErrorToast(error.response.data.detail);
            return;
        } else if (error.response?.data?.email) {
            ErrorToast(error.response.data.email[0]);
            return;
        } else {
            ErrorToast(error.message);
        }
        return Promise.reject(error);
    },
);

export default axios;

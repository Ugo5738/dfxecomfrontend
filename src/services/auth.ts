import { useQuery } from "@tanstack/react-query";
import axios from "./axios";

export interface User {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    date_joined: string;
    last_login: string;
}

export const removeEmpty = (obj: never) => {
    Object.keys(obj).forEach((key) => obj[key] == null || (!obj[key] && delete obj[key]));
    return obj;
};

export const useGetUser = () => {
    const { data, error, isLoading, isSuccess } = useQuery(["users"], async () => {
        const res = await axios.get("/current-user/");
        return res;
    });

    return { data, error, isLoading, isSuccess };
};

import { useQuery } from "@tanstack/react-query";
import axios from "./axios";
import URLS from "./urls";

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

export const useGetUser = () => {
    const { data, error, isLoading, isSuccess } = useQuery(["current-users"], async () => {
        const res = await axios.get(URLS.CURRENT_USER);
        return res;
    });

    return { data, error, isLoading, isSuccess };
};

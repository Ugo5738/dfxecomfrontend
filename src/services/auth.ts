import { useQuery } from "@tanstack/react-query";
import axios from "./axios";
import URLS from "./urls";
import { UserType } from "../utils/types";

export const useGetUser = () => {
    const { data, error, isLoading, isSuccess } = useQuery(["current-users"], async () => {
        const res = await axios.get(URLS.CURRENT_USER);
        return res.data as unknown as UserType;
    });

    return { data, error, isLoading, isSuccess };
};

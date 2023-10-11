import { useQuery } from "@tanstack/react-query";
import axios from "./axios";
import URLS from "./urls";
import { OrderSummaryType } from "../utils/types";

interface OrderSummaryResponseType {
    order_summary: OrderSummaryType;
}

export const useGetOrderSummary = ({ enabled = true } = {}) => {
    const { data, error, isLoading, isSuccess } = useQuery(
        ["order_summary"],
        async () => {
            const res = await axios.get(URLS.ORDER_SUMMARY);
            return res.data as OrderSummaryResponseType;
        },
        { enabled },
    );

    return { data, error, isLoading, isSuccess };
};

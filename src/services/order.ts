import { useQuery } from "@tanstack/react-query";
import axios from "./axios";
import URLS from "./urls";
import { OrderSummaryType } from "../utils/types";
// import { ParamsType } from "./../utils/types";
// import { removeEmpty } from "../utils/format";

interface OrderSummaryResponseType {
    order_summary: OrderSummaryType;
}

interface PaymentDetailsResponseType {
    order_id: number;
    total: number;
    tx_ref: string;
}

export const useGetOrderSummary = () => {
    const { data, error, isLoading, isSuccess } = useQuery(["order_summary"], async () => {
        const res = await axios.get(URLS.ORDER_SUMMARY);
        return res.data as unknown as OrderSummaryResponseType;
    });

    return { data, error, isLoading, isSuccess };
};

export const useGetPaymentDetails = () => {
    const { data, error, isLoading, isSuccess } = useQuery(["payment_details"], async () => {
        const res = await axios.post(URLS.PAYMENT);
        return res.data as unknown as PaymentDetailsResponseType;
    });

    return { data, error, isLoading, isSuccess };
};

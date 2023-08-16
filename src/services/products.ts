import { useQuery } from "@tanstack/react-query";
import axios from "./axios";
import URLS from "./urls";
import { ProductType, ShopCategoriesType } from "../utils/types";
import { ParamsType } from "./../utils/types";
import { removeEmpty } from "../utils/format";

export const useGetTrendingInventory = () => {
    const { data, error, isLoading, isSuccess } = useQuery(["trending_inventory"], async () => {
        const res = await axios.get(URLS.TRENDING_INVENTORY);
        return res.data as unknown as ShopCategoriesType[];
    });

    return { data, error, isLoading, isSuccess };
};

export const useGetProducts = (params?: ParamsType) => {
    removeEmpty(params!);
    const { data, error, isLoading, isSuccess, isPreviousData } = useQuery(
        ["products", params],
        async () => {
            const res = await axios.get(URLS.PRODUCTS, { params });
            return res.data as unknown as ProductType;
        },
        { keepPreviousData: true },
    );

    return { data, error, isLoading, isSuccess, isPreviousData };
};

export const useGetInventoryProducts = (params?: ParamsType) => {
    removeEmpty(params!);
    const { data, error, isLoading, isSuccess, isPreviousData } = useQuery(
        ["products_inventory", params],
        async () => {
            const res = await axios.get(URLS.PRODUCTS_INVENTORY, { params });
            return res.data as unknown as ProductType;
        },
        { keepPreviousData: true },
    );

    return { data, error, isLoading, isSuccess, isPreviousData };
};

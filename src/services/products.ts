import { useQuery } from "@tanstack/react-query";
import axios from "./axios";
import URLS from "./urls";
import {
  BrandType,
  CategoryType,
  ProductDetailType,
  ProductType,
  ShopCategoriesType,
} from "../utils/types";
import { ParamsType } from "./../utils/types";
import { removeEmpty } from "../utils/format";

export const useGetTrendingInventory = () => {
  const { data, error, isLoading, isSuccess } = useQuery(["trending_inventory"], async () => {
    const res = await axios.get(URLS.TRENDING_INVENTORY);
    return res?.data as ShopCategoriesType[];
  });

  return { data, error, isLoading, isSuccess };
};

export const useGetProducts = (params?: ParamsType) => {
  removeEmpty(params!);
  const { data, error, isLoading, isSuccess, isPreviousData } = useQuery(
    ["products", params],
    async () => {
      const res = await axios.get(URLS.PRODUCTS, { params });
      return res?.data as ProductType;
    },
    { keepPreviousData: true },
  );

  return { data, error, isLoading, isSuccess, isPreviousData };
};

export const useGetInventorySalesProducts = (params?: ParamsType) => {
  removeEmpty(params!);
  const { data, error, isLoading, isSuccess, isPreviousData } = useQuery(
    ["products_inventory", params],
    async () => {
      const res = await axios.get(URLS.PRODUCTS_INVENTORY_SALES, { params });
      return res?.data as ProductType;
    },
    { keepPreviousData: true },
  );

  return { data, error, isLoading, isSuccess, isPreviousData };
};

export const useGetSingleProduct = (sku: string) => {
  const { data, error, isLoading, isSuccess } = useQuery(
    ["single_product", sku],
    async () => {
      const res = await axios.get(URLS.PRODUCT(sku));
      return res?.data as ProductDetailType;
    },
    {
      enabled: !!sku,
    },
  );

  return { data, error, isLoading, isSuccess };
};

export const useGetBrands = () => {
  const { data, error, isLoading, isSuccess } = useQuery(["get_brands"], async () => {
    const res = await axios.get(URLS.BRANDS_INVENTORY);
    return res?.data as BrandType;
  });

  return { data, error, isLoading, isSuccess };
};

export const useGetCategories = () => {
  const { data, error, isLoading, isSuccess } = useQuery(["get_categories"], async () => {
    const res = await axios.get(URLS.CATEGORY_INVENTORY);
    return res?.data as CategoryType[];
  });

  return { data, error, isLoading, isSuccess };
};

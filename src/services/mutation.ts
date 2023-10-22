import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginPayloadType, ProductDetailType, RegisterPayloadType } from "../utils/types";
import axios from "./axios";
import URLS from "./urls";

export const UseLoginMutation = () =>
  useMutation(["login"], async (login: LoginPayloadType) => {
    const res = await axios.post(URLS.LOGIN, login);
    return res;
  });
export const UseRefreshMutation = () =>
  useMutation(["refeshed"], async (refresh: string) => {
    const res = await axios.post(URLS.REFRESH_TOKEN, refresh);
    return res;
  });

export const UseRegisterMutation = () =>
  useMutation(["register"], async (register: RegisterPayloadType) => {
    const res = await axios.post(URLS.REGISTER, register);
    return res;
  });

export const UseAddToCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ sku, quantity }: { sku: string; quantity: number }) => {
      const res = await axios.post(URLS.ADD_ORDERS(sku, quantity));
      return res;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["order_summary"] });
    },
  });
};

export const UseRemoveFromCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sku: string) => {
      const res = await axios.post(URLS.REMOVE_ORDERS(sku));
      return res;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["order_summary"] });
    },
  });
};

export const UseReduceFromCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sku: string) => {
      const res = await axios.post(URLS.REDUCE_ORDERS(sku));
      return res;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["order_summary"] });
    },
  });
};

export const UseGetSingleProductMutation = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sku: string) => {
      const res = await axios.get(URLS.PRODUCT(sku));
      return res.data as unknown as ProductDetailType;
    },
    onSuccess: async () => {
      await QueryClient.invalidateQueries({ queryKey: ["single_product"] });
    },
  });
};

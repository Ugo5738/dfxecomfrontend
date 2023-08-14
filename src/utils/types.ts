import { MutableRefObject } from "react";

export interface RegisterPayloadType {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    profile: {
        country: string;
    };
}

export interface LoginPayloadType {
    email: string;
    password: string;
}

export interface SignUpFormType {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    phone: string;
}

export interface LoginFormType {
    email: string;
    password: string;
}

export interface CheckoutType {
    cvv: number;
    email: string;
    card_number: number;
    expiry_date: string;
    promo_code?: string;
}

export type ColorObject = Record<string, Record<string, string>>;

export interface InventoryType {
    id: number;
    name: string;
    image: string;
}

export interface ShopCategoriesType {
    id: number;
    name: string;
    sample_product: {
        id: number;
        name: string;
        image: string;
    };
}

export interface ProductResultType {
    sku: string;
    product_name: string;
    store_price: string;
    sale_price?: string;
    discount_store_price?: string;
    default_image: string;
    condition: string;
}

export interface ProductType {
    count: number;
    next: string;
    previous: string;
    results: ProductResultType[];
}

export interface ParamsType {
    search?: string;
    product_name?: string;
    brand_name?: string;
    color?: string;
    storage?: string;
    attribute?: string;
    price_min?: string;
    price_max?: string;
    condition: ("new" | "used")[];
    page?: number;
    page_size?: number;
}

export interface ParentRefType extends MutableRefObject<null> {
    scrollWidth: number;
    clientWidth: number;
    scrollLeft: number;
}

export interface ErrorPropsType extends Error {
    statusText: string;
    data: string;
    message: string;
    status: number;
}

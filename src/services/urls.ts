const API_URL = import.meta.env.VITE_API_URL as string;

const URLS = {
    API_URL,
    LOGIN: `/auth/token/`,
    REFRESH: `/auth/login/token/refresh/`,
    LOGOUT: `/auth/logout/`,
    REGISTER: `/auth/register/`,
    USERS: `/auth/users/`,
    CURRENT_USER: `/auth/current-user/`,
    USER: (id: string) => `/auth/users/${id}`,
    PRODUCTS: `/inventory/products/`,
    TRENDING_INVENTORY: `/inventory/trending-categories/`,
    PRODUCTS_INVENTORY: `/inventory/product-inventory-sales/`,
    BRANDS_INVENTORY: `/inventory/brands/`,
    CATEGORY_INVENTORY: `/inventory/categories/`,
    PRODUCT: (sku: string) => `/inventory/product/${sku}/`,
    ORDER_SUMMARY: `/order/order-summary/`,
    ADD_ORDERS: (sku: string, quantity: number) => `/order/add-to-cart/${sku}/${quantity}/`,
    REMOVE_ORDERS: (sku: string) => `/order/remove-from-cart/${sku}/`,
    REDUCE_ORDERS: (sku: string) => `/order/remove-single-from-cart/${sku}/`,
    COUPON_ORDER: (order_id: string, coupon: string) =>
        `/order/apply-coupon/${order_id}/${coupon}/`,
    PAYMENT: `/payment/initiate-payment/`,
};

export default URLS;

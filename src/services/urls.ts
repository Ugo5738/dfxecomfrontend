const API_URL = import.meta.env.VITE_API_URL as string;

const URLS = {
    API_URL,
    LOGIN: `/auth/login/token/`,
    REFRESH: `/auth/login/token/refresh/`,
    LOGOUT: `/auth/logout/`,
    REGISTER: `/auth/register/`,
    USERS: `/auth/users/`,
    CURRENT_USER: `/auth/current-user/`,
    USER: (id: string) => `/auth/users/${id}`,
    TRENDING_INVENTORY: `/inventory/trending-categories/`,
    PRODUCTS: `/inventory/products/`,
    PRODUCTS_INVENTORY: `/inventory/product-inventory-sales/`,
};

export default URLS;

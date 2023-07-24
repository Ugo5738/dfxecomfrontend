const API_URL = import.meta.env.VITE_API_URL as string;

const URLS = {
    API_URL,
    LOGIN: `${API_URL}/login/token/`,
    REFRESH: `${API_URL}/login/token/refresh/`,
    LOGOUT: `${API_URL}/logout`,
    REGISTER: `${API_URL}/register`,
    USERS: `${API_URL}/users/`,
    USER: (id: string) => `${API_URL}/users/${id}`,
};

export default URLS;

const TOKEN_KEY = "dfx-token";

export const setAuthToken = (token: string) => {
    return sessionStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = () => {
    return sessionStorage.getItem(TOKEN_KEY);
};

export const clearAuthToken = (): void => {
    sessionStorage.removeItem(TOKEN_KEY);
};

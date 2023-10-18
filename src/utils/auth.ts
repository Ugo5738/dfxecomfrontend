export const TOKEN_KEY = "dfx-token";
export const TOKEN_KEY2 = "dfx-token2";

export const setAuthToken = (token: string) => {
  return sessionStorage.setItem(TOKEN_KEY, token);
};
export const setAuthRefreshToken = (refresh_token: string) => {
  return sessionStorage.setItem(TOKEN_KEY2, refresh_token);
};

export const getAuthToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};
export const getAuthRefreshToken = () => {
  return sessionStorage.getItem(TOKEN_KEY2);
};

export const clearAuthToken = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};
export const clearAuthRefreshToken = (): void => {
  sessionStorage.removeItem(TOKEN_KEY2);
};

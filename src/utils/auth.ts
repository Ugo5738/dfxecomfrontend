const TOKEN_KEY = "dfx-token";
const TOKEN_KEY2 = "dfx-token2";

export const setAuthToken = (token: string) => {
  return sessionStorage.setItem(TOKEN_KEY, token);
};
export const setAuthToken2 = (token2: string) => {
  return sessionStorage.setItem(TOKEN_KEY2, token2);
};

export const getAuthToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};
export const getAuthToken2 = () => {
  return sessionStorage.getItem(TOKEN_KEY2);
};

export const clearAuthToken = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};
export const clearAuthToken2 = (): void => {
  sessionStorage.removeItem(TOKEN_KEY2);
};

import axios from "axios";
import { baseURL } from "@/constants/baseURL";
import { save, getValueFor } from "./secureStore";

export const api = axios.create({
  baseURL: `${baseURL}/api/`,
  headers: {
    "Content-Type": "application/json",
    Connection: "keep - alive",
    "Keep-Alive": "timeout=1500, max=100",
  },
});

export const setToken = (token: string) => {
  save("token", token); // Save token to secure store as { access and refresh }

  if (!token) return;

  const { access } = JSON.parse(token);

  api.defaults.headers.Authorization = `Bearer ${access}`;
};

const refreshToken = async () => {
  try {
    const tokenData = await getValueFor("token");
    if (!tokenData) throw new Error("Token não encontrado");

    const { refresh } = JSON.parse(tokenData);

    console.log("Renovando token...");

    const response = await api.post(`login/refresh/`, {
      refresh,
    });

    const newToken = response.data;
    await save("token", JSON.stringify(newToken)); // Salva os novos tokens

    api.defaults.headers.Authorization = `Bearer ${newToken.access}`;
    return newToken.access;
  } catch (error) {
    console.error("Erro ao renovar token:", error);
    throw error; // Lança erro para que o usuário seja deslogado se falhar
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.response.data.code === "token_not_valid" &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("login") // not retrying login requests
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

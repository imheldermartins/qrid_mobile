import axios from "axios";
import { API_DEV, API_PROD } from "@env";

export const api = axios.create({
  baseURL: API_PROD || API_DEV,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};

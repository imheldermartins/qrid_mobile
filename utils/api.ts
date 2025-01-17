import axios from "axios";
import { API_DEV } from "@env";

export const api = axios.create({
  baseURL: API_DEV,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};

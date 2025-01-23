import axios from "axios";
import { baseURL } from "@/constants/baseURL";
import { save } from "./secureStore";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token: string) => {
  save("token", token);

  api.defaults.headers.Authorization = `Bearer ${token}`;
};

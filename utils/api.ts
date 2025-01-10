import axios from "axios";

const baseURL = process.env.API_DEV || "http://192.168.1.7:5000";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};

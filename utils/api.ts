import axios from "axios";

const baseURL = "http://192.168.2.114:5000";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};

import { API_DEV, API_PROD } from "@env";

export const baseURL =
    API_PROD
    || API_DEV
    || "https://192.168.3:5000";
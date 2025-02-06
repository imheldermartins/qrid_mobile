export const baseURL =
    process.env.EXPO_PUBLIC_API_PROD // This is the production URL
    || process.env.EXPO_PUBLIC_API_DEV // This is the development URL
    || "https://192.168.1.2:5000";
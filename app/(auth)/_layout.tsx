import { Layout } from "@/components/Layout";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenLayout={Layout}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    )
}
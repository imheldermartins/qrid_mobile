import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
    const { isLogged, isLoading } = useAuth();

    if (isLoading) return null;

    if (!isLogged) {
        return <Redirect href="/start" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}

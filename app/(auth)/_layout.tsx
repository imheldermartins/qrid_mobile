import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <Stack
            screenLayout={({ children }) => (
                <>
                    {children}
                    <StatusBar style="dark" />
                </>
            )}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/* <Stack.Screen name="+not-found" /> */}
        </Stack>
    )
}
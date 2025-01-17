import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <Stack
            initialRouteName="home"
            screenLayout={({ children }) => (
                <>
                    {children}
                    <StatusBar style="dark" />
                </>
            )}
        >
            <Stack.Screen name="home" options={{ headerShown: false }} />
            {/* <Stack.Screen name="+not-found" /> */}
        </Stack>
    )
}
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <Stack
            initialRouteName="signIn"
            screenLayout={({ children }) => (
                <>
                    {children}
                    <StatusBar style="dark" />
                </>
            )}
        >
            <Stack.Screen name="signIn" options={{ headerShown: false }} />
            <Stack.Screen name="signUp" options={{ headerShown: false }} />
            {/* <Stack.Screen name="+not-found" /> */}
        </Stack>
    )
}
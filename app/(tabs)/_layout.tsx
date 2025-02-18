import { DashboardLayout } from "@/components/Layout/Dashboard";
import { TabBar } from "@/components/TabBar";
import { useAuth } from "@/contexts/AuthContext";
import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { View } from "react-native";

export default function AppLayout() {
    const { isLogged, isLoading } = useAuth();

    if (isLoading) return null;

    if (!isLogged) {
        return <Redirect href="/start" />;
    }

    return (
        <Tabs
            tabBar={props => <TabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: colors.dark[100],
                tabBarActiveTintColor: colors.blue[500],
                tabBarBackground: () => <View className="w-full h-full" />,
                tabBarStyle: {
                    backgroundColor: colors.transparent
                }
            }}
            screenLayout={DashboardLayout}
        >
            <Tabs.Screen name="index" options={{
                tabBarIcon: ({ color, size = 24 }) => (
                    <Feather name="home" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="search" options={{
                tabBarIcon: ({ color, size = 24 }) => (
                    <Feather name="search" size={size} color={color} />
                ),
            }} />
        </Tabs>
    )
}

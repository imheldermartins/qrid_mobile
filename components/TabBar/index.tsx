import React from "react";
import { PlatformPressable } from "@react-navigation/elements";
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { useLinkBuilder } from "@react-navigation/native";

import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useBottomSheet } from "@/contexts/ui/BottomSheet";
import { QuickActions } from "./QuickActions";

type TabBarIconProps = {
    color: string;
    size: number;
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { buildHref } = useLinkBuilder();
    const { expand, snapTo } = useBottomSheet();

    const handleQuickTransaction = () => {
        expand(<QuickActions />)
        snapTo(3);
    };

    const icon = {
        index: ({ size, color }: TabBarIconProps) => <Feather name="home" size={size} color={color} />,
        search: ({ size, color }: TabBarIconProps) => <Feather name="search" size={size} color={color} />,
        quickAction: ({ size, color }: TabBarIconProps) => <Feather name="plus" size={size} color={color} />,
        stats: ({ size, color }: TabBarIconProps) => <Feather name="bar-chart-2" size={size} color={color} />,
        transactions: ({ size, color }: TabBarIconProps) => <Feather name="list" size={size} color={color} />
    };

    const routeNames = state.routes.map(route => route.name);
    const routes = state.routes.filter(route => route.name !== "profile");
    const tabs = [...routes];
    tabs.splice(2, 0, { name: "quickAction", key: "quickAction" });

    return (
        <View style={styles.container}>
            <View style={styles.tabbar}>
                {tabs.map((route) => {
                    if (route.name === "quickAction") {
                        return <View key={route.name} style={styles.spacer} />
                    }

                    const { options } = descriptors[route.key];
                    const isFocused =
                        state.index === routeNames.findIndex(r => r === route.name);

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };

                    return (
                        <PlatformPressable
                            key={route.name}
                            href={buildHref(route.name, route.params)}
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarButtonTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={[styles.tab]}
                        >
                            {icon[route.name as keyof typeof icon]({
                                size: 24,
                                color: isFocused ? colors.green[500] : colors.dark[700],
                            })}
                        </PlatformPressable>
                    );
                })}
            </View>

            {/* Quick Action Button (Centered Above the TabBar) */}
            <TouchableHighlight style={styles.quickAction} onPress={handleQuickTransaction}>
                {icon.quickAction({ size: 32, color: colors.light[300] })}
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    tabbar: {
        flexDirection: "row",
        backgroundColor: colors.light[100],
        borderStartStartRadius: 30,
        borderEndStartRadius: 30,
        borderWidth: 1,
        borderColor: colors.light[300],
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    quickAction: {
        position: "absolute",
        bottom: 20,
        backgroundColor: colors.green[500],
        borderRadius: 50,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: colors.green[500],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10, // Android shadow
    },
    spacer: {
        width: 70
    }
});

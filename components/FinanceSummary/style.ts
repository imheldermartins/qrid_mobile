import { colors } from "@/styles/colors";
import {  StyleSheet } from "react-native";

export const financeSummaryStyles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginVertical: 24,
    },
    rowStats: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
    }
});

export const statsView = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12,
        backgroundColor: colors.light[200],
        borderColor: colors.light[300],
        borderWidth: 1,
        borderRadius: 8,
    },
    icon: {
        backgroundColor: colors.light[100],
        padding: 8,
        borderRadius: 8,
    },
});
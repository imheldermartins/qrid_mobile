import { colors } from "@/styles/colors";
import clsx from "clsx";
import { StyleSheet, View } from "react-native";

export const Divider = ({ style, className }: any) => (
    <View className={clsx("", className)} style={StyleSheet.flatten([styles.divider, style])} />
);

const styles = StyleSheet.create({
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: colors.light[300],
    },
});
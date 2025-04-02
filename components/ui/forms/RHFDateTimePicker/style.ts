import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const rhfDateTimePickerStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.light[200],
        borderWidth: 1,
        borderColor: colors.light[300],
        borderRadius: 8,
        paddingHorizontal: 12,
    },
});
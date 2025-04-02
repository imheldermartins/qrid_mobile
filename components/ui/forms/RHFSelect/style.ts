import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const rhfSelectStyle = StyleSheet.create({
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
    },
    dropDownContainerStyle: {
        backgroundColor: colors.light[300],
        borderWidth: 1,
        borderColor: colors.light[500],
        borderRadius: 8,
        zIndex: 9999,
    },
    placeholder: {
        color: colors.dark[100],
    }
});

export const renderListItemStyle = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 8, 
        paddingHorizontal: 16
    },
    icon: {
        marginRight: 8,
    }
});
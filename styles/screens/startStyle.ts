import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.green[400]
    },
    container: {
        width: "80%",
        display: "flex",
        justifyContent: "center",
    },
    authored: { color: colors.green[100] },
    author: { color: colors.light[100] },
    title: { color: colors.light[100] },
    linkContainer: {
        marginVertical: 40,
        width: '80%',
        backgroundColor: colors.light[100],
        padding: 20,
        borderRadius: 8
    },
    linkText: {
        color: colors.green[400],
        textAlign: "center",
    },
    credits: {
        color: colors.green[200],
        textAlign: "center",
    }
});
import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.light[100]
    },
    container: {
        width: "80%",
        display: "flex",
        alignItems: "center",
        gap: 12
    },
    title: { 
        width: "80%",
        textAlign: "left",
        marginBottom: 60,
        color: colors.dark[900],
    },
    button: {
        marginTop: 20,
        width: '100%',
    },
    linkText: {
        textAlign: "center",
        color: colors.dark[100]
    },
    link: {
        color: colors.green[500],
        textDecorationColor: colors.green[500],
        textDecorationLine: "underline",
    },
});
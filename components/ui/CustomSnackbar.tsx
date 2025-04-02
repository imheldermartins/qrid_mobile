import { useSnackbar } from "@/contexts/ui/SnackbarContext";
import { Snackbar } from "react-native-paper"
import { Typography } from "./Typography";
import { StyleSheet, View } from 'react-native';
import { colors } from "@/styles/colors";
import { Icon } from "./Icon";

export const CustomSnackbar = () => {
    const {
        snackbarState: {
            visible: snackbarVisible,
            content: snackbarContent,
            type: snackbarType = 'success'
        },
        dismiss
    } = useSnackbar();

    const snackBarStyles = {
        success: {
            icon: "check-circle",
            color: colors.green[200]
        },
        error: {
            icon: "alert-triangle",
            color: colors.red[200]
        }
    } as any;

    return (
        <Snackbar
            visible={snackbarVisible}
            onDismiss={dismiss}
            style={StyleSheet.flatten([
                styles.container,
                snackbarType === "success" ? styles.success : styles.error,
            ])}
        // action={{
        //     label: 'Undo',
        //     onPress: () => {
        //         // Do something
        //     },
        // }}
        >
            <View style={styles.content}>
                {snackbarType && (
                    <Icon
                        name={snackBarStyles[snackbarType].icon}
                        size={24}
                        color={snackBarStyles[snackbarType].color}
                        style={styles.icon}
                    />)}
                <Typography
                    variant="caption"
                    style={StyleSheet.flatten([
                        snackbarType === "success" ?
                            styles.labelSuccess :
                            styles.labelError,
                    ])}
                >{snackbarContent}</Typography>
            </View>
        </Snackbar>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light[200],
        borderColor: colors.light[300],
        borderWidth: 1,
        borderRadius: 16,
        padding: 8,
    },
    success: { backgroundColor: colors.green[200] },
    error: { backgroundColor: colors.red[200] },
    content: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    icon: { marginRight: 8 },
    labelSuccess: { color: colors.green[200] },
    labelError: { color: colors.red[200] },
});
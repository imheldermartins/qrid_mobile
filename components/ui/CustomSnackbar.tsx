import { useSnackbar } from "@/contexts/ui/SnackbarContext";
import { Snackbar, Props } from "react-native-paper"
import { Typography } from "./Typography";
import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';
import clsx from "clsx";
import { colors } from "@/styles/colors";

interface CustomSnackbarProps extends Props { };

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
            // action={{
            //     label: 'Undo',
            //     onPress: () => {
            //         // Do something
            //     },
            // }}
            className={clsx("!bg-light-200 border border-light-300 !rounded-xl", {
                "!bg-red-500": snackbarType === "error",
                "!bg-green-500": snackbarType === "success"
            })}
        >
            <View className="flex flex-row items-center">
                {snackbarType && (
                    <Feather
                        name={snackBarStyles[snackbarType].icon}
                        size={24}
                        className="mr-4"
                        color={snackBarStyles[snackbarType].color}
                    />)}
                <Typography variant="body1" style={{
                    color: snackbarType === "error" ? colors.red[200] : colors.green[200]
                }}>{snackbarContent}</Typography>
            </View>
        </Snackbar>
    )
}
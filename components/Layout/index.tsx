import { useSnackbar } from "@/contexts/ui/SnackbarContext";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Snackbar } from "react-native-paper";
import { Alert } from '../ui/Alert';
import { Typography } from '../ui/Typography/index';
import { colors } from "@/styles/colors";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    const {
        snackbarState: {
            visible: snackbarVisible,
            content: snackbarContent
        },
        dismiss
    } = useSnackbar();

    return (
        <>
            {children}
            <Snackbar
                visible={snackbarVisible}
                onDismiss={dismiss}
                // action={{
                //     label: 'Undo',
                //     onPress: () => {
                //         // Do something
                //     },
                // }}
                // icon={'alert-circle'}
                // style={{
                //     backgroundColor: colors.light[300],
                // }}
                className="!bg-light-200 border border-light-300"
            >
                <Typography variant="body1">{snackbarContent}</Typography>
            </Snackbar>

            <StatusBar style="dark" />
        </>
    );
}
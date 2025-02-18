import { useSnackbar } from "@/contexts/ui/SnackbarContext";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Snackbar } from "react-native-paper";
import { Alert } from '../ui/Alert';

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
                action={{
                    label: 'Undo',
                    onPress: () => {
                        // Do something
                    },
                }}
            >
                <Alert message={snackbarContent} type="danger" />
            </Snackbar>

            <StatusBar style="dark" />
        </>
    );
}
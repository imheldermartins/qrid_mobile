import { useSnackbar } from "@/contexts/SnackbarContext";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Snackbar } from "react-native-paper";

interface LayoutProps {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const { snackbarState: { visible, content }, dismiss } = useSnackbar();
    return (
        <>
            {children}
            <Snackbar
                visible={visible}
                onDismiss={dismiss}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        // Do something
                    },
                }}
            >
                {content || ""}
            </Snackbar>
            <StatusBar style="auto" />
        </>
    );
}
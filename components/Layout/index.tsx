import { useAuth } from "@/contexts/AuthContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Snackbar } from "react-native-paper";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    // const { isLogged } = useAuth();
    const { snackbarState: { visible, content }, dismiss } = useSnackbar();

    // // if (!isLogged) {
    // //     return <Redirect href={"/sign-in"} />
    // }

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
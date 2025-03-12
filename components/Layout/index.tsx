import React from "react";
import { StatusBar } from "expo-status-bar";
import { CustomSnackbar } from "../ui/CustomSnackbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {

    return (
        <>
            {children}
            <CustomSnackbar />

            <StatusBar style="dark" />
        </>
    );
}
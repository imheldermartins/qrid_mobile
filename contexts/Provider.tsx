import { AuthProvider } from "./AuthContext";
import { SnackbarProvider } from "./SnackbarContext";

interface ProviderProps {
    children: React.ReactNode;
};

export const Provider = ({ children }: ProviderProps) => (
    <>
        <SnackbarProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </SnackbarProvider>
    </>
)
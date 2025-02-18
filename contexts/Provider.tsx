import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./AuthContext";
import { SnackbarProvider } from "./ui/SnackbarContext";
import { BottomSheetProvider } from './ui/BottomSheet';

interface ProviderProps {
    children: React.ReactNode;
};

export const Provider = ({ children }: ProviderProps) => (
    <>
        <GestureHandlerRootView>
            <BottomSheetProvider>
                <SnackbarProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </SnackbarProvider>
            </BottomSheetProvider>

        </GestureHandlerRootView>
    </>
)
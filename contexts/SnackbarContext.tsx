import React, {
    createContext,
    useContext,
    useState
} from "react";

type SnackbarType = {
    snackbarState: {
        visible: boolean;
        content?: React.ReactNode;
    };
    show: ({
        message,
        type
    }: {
        message: React.ReactNode;
        type?: "error" | "success";
    }) => void;
    dismiss: () => void;
};

const SnackbarContext = createContext<SnackbarType | null>(null);

type SnackbarProviderProps = (
    { children }: { children: React.ReactNode }
) => JSX.Element;

const SnackbarProvider: SnackbarProviderProps = ({ children }) => {
    const [snackbarState, setSnackbarState] = useState<SnackbarType["snackbarState"]>({
        visible: false,
        content: ""
    });

    const show: SnackbarType["show"] = ({ message, type }) => setSnackbarState(prev => ({ ...prev, content: message, visible: true }));
    const dismiss = () => setSnackbarState({ visible: false });

    return (
        <SnackbarContext.Provider value={{ snackbarState, show, dismiss }}>
            {children}
        </SnackbarContext.Provider>
    );
};

const useSnackbar = () => {
    const context = useContext(SnackbarContext);

    if (!context) {
        throw new Error("useSnack must be used within a SnackbarProvider");
    }

    return context;
}

export { SnackbarProvider, useSnackbar };
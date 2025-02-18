// src/contexts/ui/BottomSheet.tsx
import BottomSheet, {
    BottomSheetView,
    BottomSheetBackdrop,
    BottomSheetBackdropProps
} from '@gorhom/bottom-sheet';
import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useCallback,
    useMemo,
} from 'react';

type BottomSheetContextType = {
    /** Abre o BottomSheet no último snapPoint configurado,
     *  definindo o conteúdo que será exibido. */
    expand: (content: React.ReactNode) => void;

    /** Fecha o BottomSheet e limpa o conteúdo interno. */
    close: () => void;

    /** Dá um snap para o index informado. */
    snapTo: (index: number) => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

type BottomSheetProviderProps = {
    children: React.ReactNode;
};

// Render BottomSheetBackdrop
function RenderBackdrop(props: BottomSheetBackdropProps) {
    return (
        <BottomSheetBackdrop
            disappearsOnIndex={0}
            appearsOnIndex={1}
            {...props}
        />
    );
}

export function BottomSheetProvider({ children }: BottomSheetProviderProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);

    // Guarda o conteúdo atual que será renderizado dentro do BottomSheet
    const [content, setContent] = useState<React.ReactNode>(null);

    const snapPoints = useMemo(() => ['20%', '30%', '40%', '80%'], []);

    // Exemplo de callback para logar o índice atual do snap
    // const handleSheetChange = useCallback((index: number) => {
    //     console.log('BottomSheet mudou para índice:', index);
    // }, []);

    // Para abrir via .expand() (vai para o último snapPoint)
    const expand = useCallback((newContent: React.ReactNode) => {
        setContent(newContent);
        bottomSheetRef.current?.expand();
    }, []);

    // Para fechar via .close()
    const close = useCallback(() => {
        bottomSheetRef.current?.close();
        setContent(null);
    }, []);

    // Para dar snap em um ponto específico
    const snapTo = useCallback((index: number) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);

    // Para fechar o BottomSheet ao clicar no backdrop
    const handleRenderBackdrop = useCallback(RenderBackdrop, []);

    return (
        <BottomSheetContext.Provider
            value={{
                expand,
                close,
                snapTo
            }}
        >
            {children}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1} // inicia fechado
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backdropComponent={handleRenderBackdrop}
            // onChange={handleSheetChange}
            >
                <BottomSheetView style={{ flex: 1 }}>
                    {content}
                </BottomSheetView>
            </BottomSheet>
        </BottomSheetContext.Provider>
    );
}

export function useBottomSheet() {
    const context = useContext(BottomSheetContext);
    if (!context) {
        throw new Error(
            'useBottomSheet deve ser usado dentro de <BottomSheetProvider>.'
        );
    }
    return context;
}

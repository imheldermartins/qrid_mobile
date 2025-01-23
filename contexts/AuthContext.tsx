import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { UserData } from "@/types/user";
import { setToken } from "@/utils/api";
import { USER_DATA } from '@/constants/USER';
import { getValueFor } from "@/utils/secureStore";

type AuthContextType = {
    user: UserData;
    setUser: (user: UserData) => void;
    login: (tkn: string, userData: UserData) => boolean;
    logout: () => void;
    isLogged: boolean;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = (
    { children }: { children: React.ReactNode }
) => JSX.Element;

const AuthProvider: AuthProviderProps = ({ children }) => {
    const [user, setUser] = useState<UserData>(USER_DATA);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    const login = (tkn: string, userData: UserData): boolean => {
        if (!tkn) return false;
        setIsLoading(true);

        setToken(tkn);
        setUser(userData);
        setIsLogged(true);
        return true;
    };

    const logout = () => {
        setIsLoading(true);
        setToken("");
        setUser(USER_DATA);
        setIsLogged(false);
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    }, [isLogged]);

    useEffect(() => {
        // Verificar token ao carregar o app
        const checkToken = async () => {
            setIsLoading(true);
            const tkn = await getValueFor("token");
            if (tkn) {
                setToken(tkn); // Define o token na API
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
            setIsLoading(false);
        };

        checkToken();
    }, []); // Só executa ao carregar o componente

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            login,
            logout,
            isLogged,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
}

export { AuthProvider, useAuth };
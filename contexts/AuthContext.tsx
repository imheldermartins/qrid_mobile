import {
    createContext,
    useContext,
    useState
} from "react";

import { UserData } from "@/types/user";
import { setToken } from "@/utils/api";
import { USER_DATA } from '@/constants/USER';

type AuthContextType = {
    user: UserData;
    setUser: (user: UserData) => void;
    login: (tkn: string, userData: UserData) => boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = (
    { children }: { children: React.ReactNode }
) => JSX.Element;

const AuthProvider: AuthProviderProps = ({ children }) => {
    const [user, setUser] = useState<UserData>(USER_DATA);

    const login = (tkn: string, userData: UserData): boolean => {
        if (!tkn) return false;

        setToken(tkn);
        setUser(userData);
        return true;
    };

    const logout = () => {
        setToken("");
        setUser(USER_DATA);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
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
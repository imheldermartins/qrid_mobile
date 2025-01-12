import { UserData } from "@/types/user";
import { setToken } from "@/utils/api";
import { createContext, useContext, useState } from "react";
import { USER_DATA } from '../constants/USER';

type SessionContextType = {
    user: UserData;
    setUser: (user: UserData) => void;
    login: (tkn: string, userData: UserData) => boolean;
    logout: () => void;
};

const SessionContext = createContext<SessionContextType | null>(null);

type SessionProviderProps = (
    { children }: { children: React.ReactNode }
) => JSX.Element;

const SessionProvider: SessionProviderProps = ({ children }) => {
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
        <SessionContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};

const useSession = () => {
    const context = useContext(SessionContext);

    if (!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }

    return context;
}

export { SessionProvider, useSession };
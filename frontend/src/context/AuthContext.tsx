import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { User } from "../types/types";

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');

        // Make sure that storedUser is not null or undefined before parsing
        if (storedToken && storedUser) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                localStorage.removeItem("authUser");
                localStorage.removeItem("authToken");
            }
        }
    }, []);

    const login = (userData: User, token: string) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("authUser", JSON.stringify(userData));
        localStorage.setItem("authToken", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
    };

    return(
        <AuthContext.Provider value={{login, logout, user, token}} >
            {children}
        </AuthContext.Provider>
    );
}

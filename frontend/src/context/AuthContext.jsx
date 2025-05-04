import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

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

    const login = (userData, token) => {
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

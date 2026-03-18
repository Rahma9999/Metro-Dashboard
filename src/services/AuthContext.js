import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    const login = (token, adminName, ssn, email) => {
        localStorage.setItem("token", token);
        localStorage.setItem("ssn", ssn);
        localStorage.setItem("email", email);
        localStorage.setItem('name', adminName);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem("token");
        localStorage.removeItem("ssn");
        localStorage.removeItem("email");

        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
import { createContext, useEffect, useRef, useState } from "react";
import { setTokenGetter } from "./axiosInstance";
import axios from "axios";

export const AuthContext = createContext();

// Separate axios instance for auth calls (avoids circular import with axiosInstance)

const authAxios = axios.create({
    baseURL: "https://metrodb-production.up.railway.app/api/v1",
    withCredentials: true,
    timeout: 10000,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // { name, email, role }
    const [token, setToken] = useState(null);  

    const tokenRef = useRef(null);

    useEffect(() => {
        setTokenGetter(() => tokenRef.current);
    }, []);

    useEffect(() => {
        tokenRef.current = token;
    }, [token]);

    const login = async (email, password) => {

        try{
            const res = await authAxios.post('/admin/login', {email, password});
            
            const receivedToken = res.data?.token;
            const admin = res.data?.data?.admin;
            
            tokenRef.current = receivedToken; // update immediately (before re-render)
            setToken(receivedToken);
            setUser(admin);

            console.log('data.data: ', res.data);
            console.log('data: ', res);

            return admin;
        }catch(err){
            throw new Error(
            err.response?.data?.message ||
            err.message ||
            "Login failed"
        );
        }
    };

    const logout = async () => {
        try {
            await authAxios.post('/admin/logout', {}, {
                headers: tokenRef.current
                    ? { Authorization: `Bearer ${tokenRef.current}` }
                    : {}
            });
        } catch (_) {
            // Clear state regardless of server response
        } finally {
            tokenRef.current = null;
            setToken(null);
            setUser(null);
        }
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{token, user, isAuthenticated, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
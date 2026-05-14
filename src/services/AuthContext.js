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

const SESSION_TOKEN_KEY = 'session_token';
const SESSION_USER_KEY  = 'session_user';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // { name, email, role }
    const [token, setToken] = useState(null);  
    const [loading, setLoading] = useState(true);

    const tokenRef = useRef(null);

    useEffect(() => {
        setTokenGetter(() => tokenRef.current);
    }, []);

    useEffect(() => {
        tokenRef.current = token;
    }, [token]);

    useEffect(() => {
        try {
            const savedToken = sessionStorage.getItem(SESSION_TOKEN_KEY);
            const savedUser  = sessionStorage.getItem(SESSION_USER_KEY);
            if (savedToken && savedUser) {
                const parsedUser = JSON.parse(savedUser);
                tokenRef.current = savedToken; // set ref immediately
                setToken(savedToken);
                setUser(parsedUser);
            }
        } catch {
            // Corrupted sessionStorage — clear it and start fresh
            sessionStorage.removeItem(SESSION_TOKEN_KEY);
            sessionStorage.removeItem(SESSION_USER_KEY);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {

        try{
            const res = await authAxios.post('/admin/login', {email, password});
            
            const receivedToken = res.data?.token;
            const admin = res.data?.data?.admin;
            
            const safeUser = {
            name:  admin?.name,
            email: admin?.email,
            role:  admin?.role,
        };

        sessionStorage.setItem(SESSION_TOKEN_KEY, receivedToken);
        sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(safeUser));

            tokenRef.current = receivedToken; // update immediately (before re-render)
            setToken(receivedToken);
            setUser(admin);
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
            sessionStorage.removeItem(SESSION_TOKEN_KEY);
            sessionStorage.removeItem(SESSION_USER_KEY);
            tokenRef.current = null;
            setToken(null);
            setUser(null);
        }
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{token, user, loading, isAuthenticated, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
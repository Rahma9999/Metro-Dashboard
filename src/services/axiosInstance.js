import axios from "axios";

let getToken = () => null; // default: no token

// AuthContext calls this once to register the token accessor
export const setTokenGetter = (fn) => {
    getToken = fn;
};

const axiosInstance = axios.create({
    baseURL: "https://metrodb-production.up.railway.app/api/v1/dashboard",
    timeout: 100000,
});
axiosInstance.interceptors.request.use(
    (config) => {
        const  token  = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid — you can trigger logout here if needed
            console.warn("Unauthorized — session may have expired.");
        }
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;

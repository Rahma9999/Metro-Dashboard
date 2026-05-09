import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://metrodb-production.up.railway.app/api/v1/dashboard",
    timeout: 100000,
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
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
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;

// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: "https://metrodb-production.up.railway.app/api/v1/dashboard",
//     timeout: 100000,
// });

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const config = error.config;

//         // Retry on 429 up to 3 times with exponential backoff
//         if (error.response?.status === 429) {
//             config._retryCount = config._retryCount || 0;

//             if (config._retryCount < 3) {
//                 config._retryCount += 1;
//                 const delay = 1000 * 2 ** config._retryCount; // 2s, 4s, 8s
//                 await new Promise((res) => setTimeout(res, delay));
//                 return axiosInstance(config);
//             }
//         }

//         console.error("API Error:", error);
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;
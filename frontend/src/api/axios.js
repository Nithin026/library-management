// Import axios
import axios from "axios";

// Create axios instance
const api = axios.create({

    // Backend URL
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",

    // JSON
    headers: {
        "Content-Type": "application/json"
    }

});

// Attach Authorization header if token exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Export
export default api;
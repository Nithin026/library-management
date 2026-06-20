// Import axios
import api from "../api/axios";

// Register user
export const registerUser = async (data) => {

    const response = await api.post(
        "/auth/register",
        data
    );

    return response.data;

};

// Login user
export const loginUser = async (data) => {

    const response = await api.post(
        "/auth/login",
        data
    );

    return response.data;

};

// Get logged-in user
export const getCurrentUser = async (token) => {

    const response = await api.get(
        "/auth/me",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};
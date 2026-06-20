// Import axios instance
import api from "../api/axios";

// Get dashboard
export const getDashboard = async () => {

    // Get token
    const token = localStorage.getItem("token");

    // Request dashboard
    const response = await api.get(

        "/admin/dashboard",

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    // Return data
    return response.data;

};
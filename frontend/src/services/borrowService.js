// Import axios instance
import api from "../api/axios";

// Get token
const getToken = () => {

    return localStorage.getItem("token");

};

// Borrow book
export const borrowBook = async (bookData) => {

    const response = await api.post(

        "/borrow",

        bookData,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return response.data;

};

// Get borrow history
export const getBorrowHistory = async () => {

    const response = await api.get(

        "/borrow",

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return response.data;

};

// Return book
export const returnBook = async (borrowId) => {

    const response = await api.put(

        `/borrow/return/${borrowId}`,

        {},

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return response.data;

};

// Get member dashboard stats
export const getUserDashboard = async () => {

    const response = await api.get("/user/dashboard");

    return response.data;

};
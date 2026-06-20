// Import axios
import api from "../api/axios";

// Get token
const getToken = () => {

    return localStorage.getItem("token");

};

// Get all books
export const getBooks = async () => {

    const response = await api.get("/books");

    return response.data;

};

// Get one book
export const getBook = async (id) => {

    const response = await api.get(`/books/${id}`);

    return response.data;

};

// Add book
export const addBook = async (book) => {

    const response = await api.post(

        "/books",

        book,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return response.data;

};

// Update book
export const updateBook = async (id, book) => {

    const response = await api.put(

        `/books/${id}`,

        book,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return response.data;

};

// Delete book
export const deleteBook = async (id) => {

    const response = await api.delete(

        `/books/${id}`,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

    return response.data;

};
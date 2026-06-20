import { useEffect, useState } from "react";
import {
    getBooks,
    addBook,
    updateBook,
    deleteBook
} from "../../services/bookService";
import useToast from "../../hooks/useToast";
import "../../styles/admin.css";

// Manage Books Page
function ManageBooks() {
    // Books state
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    // Edit/Drawer states
    const [editId, setEditId] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Search and Filter states
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [availabilityFilter, setAvailabilityFilter] = useState("All");

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 8 items per page fits perfectly on standard screens

    // Form data state
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        published_year: "",
        total_copies: "",
        available_copies: ""
    });

    // Load catalog on mount
    useEffect(() => {
        loadBooks();
    }, []);

    // Reset pagination on filter/search change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, categoryFilter, availabilityFilter]);

    // Get books
    const loadBooks = async () => {
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (error) {
            console.error("Failed to load catalog books", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Open drawer for adding a new book
    const handleOpenAdd = () => {
        setEditId(null);
        setFormData({
            title: "",
            author: "",
            isbn: "",
            category: "",
            published_year: "",
            total_copies: "",
            available_copies: ""
        });
        setIsDrawerOpen(true);
    };

    // Open drawer for editing a book
    const handleOpenEdit = (book) => {
        setEditId(book.id);
        setFormData({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            category: book.category,
            published_year: book.published_year.toString(),
            total_copies: book.total_copies.toString(),
            available_copies: book.available_copies.toString()
        });
        setIsDrawerOpen(true);
    };

    // Close drawer
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setEditId(null);
    };

    // Save book
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Input validation
        const publishedYearNum = Number(formData.published_year);
        const totalCopiesNum = Number(formData.total_copies);
        const availableCopiesNum = Number(formData.available_copies);

        if (publishedYearNum <= 0) {
            addToast("Published year must be a valid year.", "warning");
            return;
        }

        if (totalCopiesNum < 0 || availableCopiesNum < 0) {
            addToast("Copies cannot be negative.", "warning");
            return;
        }

        if (availableCopiesNum > totalCopiesNum) {
            addToast("Available copies cannot exceed total copies.", "warning");
            return;
        }

        const payload = {
            title: formData.title,
            author: formData.author,
            isbn: formData.isbn,
            category: formData.category,
            published_year: publishedYearNum,
            total_copies: totalCopiesNum,
            available_copies: availableCopiesNum
        };

        try {
            if (editId) {
                await updateBook(editId, payload);
                addToast("Book updated successfully!", "success");
            } else {
                await addBook(payload);
                addToast("Book added successfully!", "success");
            }

            handleCloseDrawer();
            loadBooks();
        } catch (error) {
            addToast(
                error.response?.data?.detail || 
                "An error occurred while saving the book.",
                "error"
            );
        }
    };

    // Delete book action
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this book from the catalog?")) {
            return;
        }

        try {
            await deleteBook(id);
            addToast("Book deleted successfully!", "success");
            loadBooks();
        } catch (error) {
            addToast(
                error.response?.data?.detail || 
                "Failed to delete book.",
                "error"
            );
        }
    };

    // Client-side Filters & Search
    const filteredBooks = books.filter((book) => {
        const matchesSearch = 
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase()) ||
            book.isbn.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = 
            categoryFilter === "All" || 
            book.category === categoryFilter;

        const matchesAvailability = 
            availabilityFilter === "All" ||
            (availabilityFilter === "Available" && book.available_copies > 0) ||
            (availabilityFilter === "Out of Stock" && book.available_copies === 0);

        return matchesSearch && matchesCategory && matchesAvailability;
    });

    // Dynamic list of unique categories
    const categories = ["All", ...new Set(books.map(b => b.category))];

    // Client-side Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;

    return (
        <div>
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '8px' }}>
                        Book Inventory Manager
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                        Add new books, update specifications, and oversee copies in rotation.
                    </p>
                </div>
                <button className="add-book-trigger-btn" onClick={handleOpenAdd}>
                    <span>➕</span> Add New Book
                </button>
            </div>

            {/* Filter Panel */}
            <div className="catalog-filters">
                <input
                    type="text"
                    className="catalog-search-input"
                    placeholder="🔍 Search by title, author, or ISBN..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: '10px 16px',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'var(--transition)'
                    }}
                />

                <select
                    className="catalog-select-filter"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    {categories.filter(c => c !== "All").map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select
                    className="catalog-select-filter"
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                    <option value="All">All Statuses</option>
                    <option value="Available">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>
            </div>

            {/* Table Container */}
            {loading ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <div className="spinner"></div>
                </div>
            ) : filteredBooks.length === 0 ? (
                <div style={{
                    background: 'white',
                    padding: '60px 40px',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--secondary)', marginBottom: '8px' }}>No Matches Found</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search filters or add a new book to the library system.</p>
                </div>
            ) : (
                <div className="table-container" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                    <table className="books-table">
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}>ID</th>
                                <th>Book Specifications</th>
                                <th>Category</th>
                                <th>Stock Management</th>
                                <th style={{ width: '180px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>#{book.id}</td>
                                    <td>
                                        <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '4px' }}>
                                            {book.title}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            By <span style={{ fontWeight: '500' }}>{book.author}</span> | ISBN: {book.isbn} | Year: {book.published_year}
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{
                                            background: 'var(--surface-hover)',
                                            padding: '4px 10px',
                                            borderRadius: '50px',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            color: 'var(--text-secondary)',
                                            border: '1px solid var(--border)'
                                        }}>
                                            {book.category}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: '600', fontSize: '0.925rem', marginBottom: '2px' }}>
                                            Available: <span style={{ color: book.available_copies > 0 ? 'var(--success)' : 'var(--error)' }}>
                                                {book.available_copies}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                                            Total registered: {book.total_copies}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button
                                            className="action-btn-edit"
                                            onClick={() => handleOpenEdit(book)}
                                            style={{
                                                padding: '8px 14px',
                                                borderRadius: 'var(--radius-sm)',
                                                fontSize: '0.85rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="action-btn-delete"
                                            onClick={() => handleDelete(book.id)}
                                            style={{
                                                padding: '8px 14px',
                                                borderRadius: 'var(--radius-sm)',
                                                fontSize: '0.85rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination Panel */}
            {!loading && filteredBooks.length > 0 && (
                <div className="pagination-container">
                    <span className="pagination-info">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredBooks.length)} of {filteredBooks.length} titles
                    </span>
                    <div className="pagination-controls">
                        <button
                            className="pagination-btn"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            Previous
                        </button>
                        <div className="pagination-pages">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <span
                                    key={page}
                                    className={`page-num ${currentPage === page ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </span>
                            ))}
                        </div>
                        <button
                            className="pagination-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Slide-out Edit/Add Drawer Backdrop */}
            <div 
                className={`drawer-backdrop ${isDrawerOpen ? 'open' : ''}`} 
                onClick={handleCloseDrawer}
            ></div>

            {/* Slide-out Drawer Panel */}
            <div className={`drawer-panel ${isDrawerOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h3>{editId ? "Update Book Details" : "Add Book to Catalog"}</h3>
                    <button className="drawer-close-btn" onClick={handleCloseDrawer}>&times;</button>
                </div>
                <div className="drawer-body">
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Book Title</label>
                            <input
                                name="title"
                                placeholder="e.g. The Hobbit"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                style={{ padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Author Name</label>
                            <input
                                name="author"
                                placeholder="e.g. J.R.R. Tolkien"
                                value={formData.author}
                                onChange={handleChange}
                                required
                                style={{ padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>ISBN Identifier</label>
                            <input
                                name="isbn"
                                placeholder="e.g. 9780261103573"
                                value={formData.isbn}
                                onChange={handleChange}
                                required
                                style={{ padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Book Category</label>
                            <input
                                name="category"
                                placeholder="e.g. Fantasy"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                style={{ padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Published Year</label>
                            <input
                                name="published_year"
                                type="number"
                                placeholder="e.g. 1937"
                                value={formData.published_year}
                                onChange={handleChange}
                                required
                                style={{ padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Total Copies</label>
                                <input
                                    name="total_copies"
                                    type="number"
                                    placeholder="e.g. 10"
                                    value={formData.total_copies}
                                    onChange={handleChange}
                                    required
                                    style={{ padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', width: '100%' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Available Copies</label>
                                <input
                                    name="available_copies"
                                    type="number"
                                    placeholder="e.g. 10"
                                    value={formData.available_copies}
                                    onChange={handleChange}
                                    required
                                    style={{ padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', width: '100%' }}
                                />
                            </div>
                        </div>

                        <button 
                            className="admin-submit-btn" 
                            type="submit"
                            style={{ 
                                marginTop: '15px', 
                                border: 'none', 
                                cursor: 'pointer',
                                background: 'var(--secondary)'
                            }}
                        >
                            {editId ? "Update Library Record" : "Add to Library Catalog"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ManageBooks;
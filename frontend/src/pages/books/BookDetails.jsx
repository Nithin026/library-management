import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBook } from "../../services/bookService";
import useToast from "../../hooks/useToast";
import "../../styles/bookdetails.css";

// Book Details Page
function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load book detail data on mount
    useEffect(() => {
        const loadBook = async () => {
            try {
                const data = await getBook(id);
                setBook(data);
            } catch (error) {
                console.error("Failed to load book specifications", error);
                addToast("Book not found.", "error");
                navigate("/books");
            } finally {
                setLoading(false);
            }
        };

        loadBook();
    }, [id, navigate, addToast]);

    if (loading) {
        return (
            <div className="flex-center-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="details-page">
            {/* Back Navigation Link */}
            <span className="back-link" onClick={() => navigate("/books")}>
                ← Back to Catalog
            </span>

            {book && (
                <div className="details-grid">
                    {/* Visual Cover mockup */}
                    <div className="cover-placeholder">
                        <span className="cover-category">{book.category}</span>
                        <div>
                            <h2 className="cover-title">{book.title}</h2>
                            <p className="cover-author">by {book.author}</p>
                        </div>
                    </div>

                    {/* Metadata Content */}
                    <div className="info-section">
                        <h1>{book.title}</h1>
                        <p className="author-name">Written by {book.author}</p>

                        <table className="meta-table">
                            <tbody>
                                <tr>
                                    <td className="meta-label">ISBN Identifier</td>
                                    <td className="meta-value">{book.isbn}</td>
                                </tr>
                                <tr>
                                    <td className="meta-label">Category Genre</td>
                                    <td className="meta-value">{book.category}</td>
                                </tr>
                                <tr>
                                    <td className="meta-label">Published Year</td>
                                    <td className="meta-value">{book.published_year}</td>
                                </tr>
                                <tr>
                                    <td className="meta-label">Total Inventory</td>
                                    <td className="meta-value">{book.total_copies} copies</td>
                                </tr>
                                <tr>
                                    <td className="meta-label">Current Status</td>
                                    <td className="meta-value">
                                        <span className={`status ${book.available_copies > 0 ? "available" : "unavailable"}`} style={{ display: 'inline-block' }}>
                                            {book.available_copies > 0 ? `${book.available_copies} Available` : "Out of Stock"}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Actions */}
                        <div className="actions-container">
                            <Link to={`/borrow/${book.id}`}>
                                <button 
                                    className="borrow-action-btn"
                                    disabled={book.available_copies === 0}
                                >
                                    {book.available_copies > 0 ? "Borrow This Book" : "Out of Stock"}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookDetails;
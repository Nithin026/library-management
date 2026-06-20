import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { borrowBook } from "../../services/borrowService";
import { getBook } from "../../services/bookService";
import useToast from "../../hooks/useToast";
import "../../styles/BorrowBook.css";

// Borrow page
function BorrowBook() {
    // Navigate
    const navigate = useNavigate();

    // Book id
    const { id } = useParams();
    const { addToast } = useToast();

    // Book metadata
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    // Due date
    const [dueDate, setDueDate] = useState("");

    // Load book details on mount
    useEffect(() => {
        const loadBook = async () => {
            try {
                const data = await getBook(id);
                setBook(data);
            } catch (error) {
                console.error("Failed to load book", error);
                addToast("Book not found.", "error");
                navigate("/books");
            } finally {
                setLoading(false);
            }
        };
        loadBook();
    }, [id, navigate, addToast]);

    // Get tomorrow's date string for input min validation
    const getTomorrowStr = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
    };

    // Borrow book
    const handleBorrow = async () => {
        // Check date
        if (!dueDate) {
            addToast("Please select a due date.", "warning");
            return;
        }

        // Validate date is in the future
        const selectedDate = new Date(dueDate);
        const today = new Date();
        today.setHours(0,0,0,0);
        if (selectedDate <= today) {
            addToast("Due date must be in the future.", "warning");
            return;
        }

        try {
            // Borrow request
            await borrowBook({
                book_id: Number(id),
                due_date: new Date(dueDate).toISOString()
            });

            // Success
            addToast("Book borrowed successfully!", "success");

            // Go to history
            navigate("/history");
        } catch (error) {
            addToast(
                error.response?.data?.detail ||
                "Borrow failed.",
                "error"
            );
        }
    };

    if (loading) {
        return (
            <div className="flex-center-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="borrow-page">
            <div className="borrow-card">
                <h1>📚 Borrow Book</h1>
                <p className="borrow-subtitle">
                    Complete the borrowing process by selecting a return date.
                </p>

                {book && (
                    <div className="book-info">
                        <span>CONFIRMING LOAN FOR</span>
                        <h2>{book.title}</h2>
                        <p style={{ marginTop: '5px', fontSize: '0.95rem', opacity: 0.9 }}>
                            By {book.author} | Category: {book.category}
                        </p>
                    </div>
                )}

                <div className="form-group">
                    <label>Due Date</label>
                    <input
                        type="date"
                        min={getTomorrowStr()}
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <button
                    className="borrow-confirm-btn"
                    onClick={handleBorrow}
                >
                    Confirm Borrow
                </button>
            </div>
        </div>
    );
}

// Export
export default BorrowBook;
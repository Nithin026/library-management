// Import
import { useEffect, useState } from "react";

// Import service
import {
    getBorrowHistory,
    returnBook
} from "../../services/borrowService";
import useToast from "../../hooks/useToast";
import "../../styles/borrowhistory.css";

// Borrow History
function BorrowHistory() {
    // Store records
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    // Load history on mount
    useEffect(() => {
        loadHistory();
    }, []);

    // Get history
    const loadHistory = async () => {
        try {
            const data = await getBorrowHistory();
            setRecords(data);
        } catch (error) {
            console.error("Failed to load history", error);
        } finally {
            setLoading(false);
        }
    };

    // Return book
    const handleReturn = async (borrowId) => {
        if (!window.confirm("Are you sure you want to return this book?")) {
            return;
        }

        try {
            await returnBook(borrowId);
            addToast("Book returned successfully!", "success");
            loadHistory();
        } catch (error) {
            addToast(
                error.response?.data?.detail ||
                "Return failed.",
                "error"
            );
        }
    };

    // Format dates nicely
    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        try {
            return new Date(dateStr).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="history-page">
            <div className="history-header">
                <div>
                    <h1>Borrow History</h1>
                    <p>Track all borrowed and returned books.</p>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div className="spinner"></div>
                </div>
            ) : records.length === 0 ? (
                <div style={{
                    background: 'white',
                    padding: '50px',
                    borderRadius: '20px',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border)'
                }}>
                    <h3 style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>No Borrow History Found</h3>
                    <p style={{ color: 'var(--text-muted)' }}>You haven't borrowed any books from the library yet.</p>
                </div>
            ) : (
                <div className="history-table-container">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Book Title</th>
                                <th>Author</th>
                                <th>Borrow Date</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {records.map((record) => (
                                <tr key={record.id}>
                                    <td>#{record.id}</td>
                                    <td>
                                        <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                                            {record.book?.title || `Book #${record.book_id}`}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            ISBN: {record.book?.isbn || "N/A"}
                                        </div>
                                    </td>
                                    <td>{record.book?.author || "-"}</td>
                                    <td>{formatDate(record.borrow_date)}</td>
                                    <td>{formatDate(record.due_date)}</td>
                                    <td>
                                        <span
                                            className={
                                                record.status === "Borrowed"
                                                    ? "status borrowed"
                                                    : "status returned"
                                            }
                                        >
                                            {record.status}
                                        </span>
                                    </td>
                                    <td>
                                        {record.status === "Borrowed" ? (
                                            <button
                                                className="return-btn"
                                                onClick={() => handleReturn(record.id)}
                                            >
                                                Return Book
                                            </button>
                                        ) : (
                                            <span className="returned-text">
                                                ✓ Returned
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

// Export
export default BorrowHistory;
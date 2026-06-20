import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getUserDashboard } from "../services/borrowService";
import "../styles/dashboard.css";

// Dashboard Page
function Dashboard() {
    // Auth context details
    const { user } = useAuth();

    // Redirect admin to admin dashboard if they access standard dashboard
    if (user?.role === "admin") {
        return <Navigate to="/admin" replace />;
    }

    // Stats state
    const [stats, setStats] = useState({
        borrowed_books: 0,
        books_read: 0,
        due_soon: 0,
        overdue: 0
    });

    // Loading and error states
    const [loading, setLoading] = useState(true);

    // Fetch dashboard stats on mount
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getUserDashboard();
                setStats(data);
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (

        <main className="dashboard">

            {/* Welcome Section */}
            <section className="dashboard-header">

                <h1>Welcome Back, {user?.name || "Member"} 👋</h1>

                <p>
                    Manage your borrowed books, track deadlines, and search catalog records.
                </p>

            </section>

            {/* Statistics */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div className="spinner"></div>
                </div>
            ) : (
                <section className="dashboard-stats">

                    <div className="stat-card">
                        <h2>{stats.borrowed_books}</h2>
                        <p>Borrowed Books</p>
                    </div>

                    <div className="stat-card">
                        <h2>{stats.books_read}</h2>
                        <p>Books Read</p>
                    </div>

                    <div className="stat-card">
                        <h2>{stats.due_soon}</h2>
                        <p>Due Soon</p>
                    </div>

                    <div className="stat-card" style={stats.overdue > 0 ? { borderLeftColor: 'var(--error)' } : {}}>
                        <h2 style={stats.overdue > 0 ? { color: 'var(--error)' } : {}}>
                            {stats.overdue}
                        </h2>
                        <p>Overdue Books</p>
                    </div>

                </section>
            )}

            {/* Quick Actions */}
            <section className="dashboard-actions">

                <h2>Quick Actions</h2>

                <div className="action-grid">

                    <Link to="/books">
                        <button>Browse Catalog</button>
                    </Link>

                    <Link to="/history">
                        <button>My Borrow History</button>
                    </Link>

                    <Link to="/profile">
                        <button>Account Profile</button>
                    </Link>

                </div>

            </section>

        </main>

    );

}

// Export
export default Dashboard;
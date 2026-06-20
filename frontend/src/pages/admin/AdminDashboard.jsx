import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../../services/adminService";
import "../../styles/admin.css";

// Admin Dashboard Page
function AdminDashboard() {
    // Dashboard data
    const [dashboard, setDashboard] = useState({
        total_users: 0,
        total_books: 0,
        borrowed_books: 0,
        returned_books: 0,
        available_books: 0
    });

    const [loading, setLoading] = useState(true);

    // Load dashboard stats on mount
    useEffect(() => {
        loadDashboard();
    }, []);

    // Get dashboard stats
    const loadDashboard = async () => {
        try {
            const data = await getDashboard();
            setDashboard(data);
        } catch (error) {
            console.error("Failed to load admin dashboard statistics", error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate percentages for distribution bars
    const totalBooks = dashboard.total_books || 0;
    const availablePercent = totalBooks > 0 ? Math.round((dashboard.available_books / totalBooks) * 100) : 0;
    const borrowedPercent = totalBooks > 0 ? Math.round((dashboard.borrowed_books / totalBooks) * 100) : 0;

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '35px' }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '8px' }}>
                    Dashboard Overview
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                    Real-time library indicators, transaction records, and system health status.
                </p>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    {/* Grid Cards */}
                    <div className="dashboard-stats" style={{ marginBottom: '40px' }}>
                        <div className="stat-card" style={{ borderLeftColor: '#3b82f6' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👥</div>
                            <h2>{dashboard.total_users}</h2>
                            <p>Registered Readers</p>
                        </div>

                        <div className="stat-card" style={{ borderLeftColor: '#10b981' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📚</div>
                            <h2>{dashboard.total_books}</h2>
                            <p>Catalog Titles</p>
                        </div>

                        <div className="stat-card" style={{ borderLeftColor: '#f59e0b' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📥</div>
                            <h2>{dashboard.borrowed_books}</h2>
                            <p>Active Borrow Records</p>
                        </div>

                        <div className="stat-card" style={{ borderLeftColor: '#8b5cf6' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔄</div>
                            <h2>{dashboard.returned_books}</h2>
                            <p>Returns Processed</p>
                        </div>

                        <div className="stat-card" style={{ borderLeftColor: '#ec4899' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</div>
                            <h2>{dashboard.available_books}</h2>
                            <p>Available Copies</p>
                        </div>
                    </div>

                    {/* Distribution Section */}
                    <div className="overview-distribution" style={{ maxWidth: '800px' }}>
                        <div className="distribution-header">
                            <h3>Catalog Allocation</h3>
                            <p>Percentage representation of current inventory usage</p>
                        </div>
                        
                        <div className="distribution-bars">
                            <div className="dist-bar-item">
                                <div className="dist-bar-labels">
                                    <span>Available in Library ({dashboard.available_books} copies)</span>
                                    <span>{availablePercent}%</span>
                                </div>
                                <div className="dist-bar-track">
                                    <div 
                                        className="dist-bar-fill dist-fill-available" 
                                        style={{ width: `${availablePercent}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="dist-bar-item">
                                <div className="dist-bar-labels">
                                    <span>Currently Loaned out ({dashboard.borrowed_books} copies)</span>
                                    <span>{borrowedPercent}%</span>
                                </div>
                                <div className="dist-bar-track">
                                    <div 
                                        className="dist-bar-fill dist-fill-borrowed" 
                                        style={{ width: `${borrowedPercent}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AdminDashboard;
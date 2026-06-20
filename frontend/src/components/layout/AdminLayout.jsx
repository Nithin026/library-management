import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/admin.css";

// Admin Layout Wrapper
function AdminLayout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Get initials for profile avatar
    const getInitials = (name) => {
        if (!name) return "A";
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    return (
        <div className="admin-workspace">
            {/* Sidebar Navigation */}
            <aside className="admin-sidebar">
                <div>
                    {/* Brand */}
                    <div className="sidebar-brand">
                        <span className="sidebar-brand-logo">⚙️</span>
                        <h2>Admin Panel</h2>
                    </div>

                    {/* Navigation Links */}
                    <nav className="sidebar-menu">
                        <NavLink 
                            to="/admin" 
                            end
                            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                        >
                            <span>📊</span> Dashboard Overview
                        </NavLink>

                        <NavLink 
                            to="/admin/books" 
                            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                        >
                            <span>📚</span> Manage Catalog
                        </NavLink>

                        <Link to="/books" className="sidebar-link">
                            <span>🔍</span> Browse Catalog
                        </Link>
                    </nav>
                </div>

                {/* Profile Card */}
                <div className="sidebar-profile-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="sidebar-profile">
                        <div className="profile-avatar">
                            {getInitials(user?.name)}
                        </div>
                        <div className="profile-info">
                            <span className="profile-name" title={user?.name}>
                                {user?.name || "Administrator"}
                            </span>
                            <span className="profile-role">
                                {user?.role || "Admin"}
                            </span>
                        </div>
                    </div>

                    <button 
                        onClick={handleLogout}
                        className="sidebar-link"
                        style={{ 
                            marginTop: '4px',
                            padding: '10px 14px',
                            color: 'rgba(255, 100, 100, 0.8)',
                            background: 'rgba(239, 68, 68, 0.05)'
                        }}
                    >
                        <span>🚪</span> Logout System
                    </button>
                </div>
            </aside>

            {/* Content Area */}
            <main className="admin-content">
                {children}
            </main>
        </div>
    );
}

export default AdminLayout;

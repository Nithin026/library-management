import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/navbar.css";

// Navbar
function Navbar() {
    // Get auth data
    const { token, user, logout } = useAuth();

    // Navigation
    const navigate = useNavigate();

    // Path tracking
    const location = useLocation();

    // Logout
    const handleLogout = () => {
        // Remove token
        logout();

        // Go to login
        navigate("/login");
    };

    // Active state helper
    const isActive = (path) => {
        if (path === "/admin") {
            return location.pathname.startsWith("/admin");
        }
        return location.pathname === path;
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/" className="brand-logo">
                    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="brand-icon">
                        <path d="M6 24V6a3 3 0 0 1 3-3h14v21H9a3 3 0 0 0-3 3z" />
                        <path d="M6 24a3 3 0 0 1 3-3h14v4H9a3 3 0 0 1-3-3z" />
                    </svg>
                    <span className="brand-title">Library</span>
                </Link>
            </div>

            <div className="nav-links">
                {
                    token ? (
                        <>
                            {user?.role !== "admin" && (
                                <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
                                    Dashboard
                                </Link>
                            )}

                            <Link to="/books" className={isActive("/books") ? "active" : ""}>
                                Books
                            </Link>

                            {user?.role !== "admin" && (
                                <Link to="/history" className={isActive("/history") ? "active" : ""}>
                                    Borrow History
                                </Link>
                            )}

                            {user?.role === "admin" && (
                                <Link to="/admin" className={isActive("/admin") ? "active admin-link" : "admin-link"}>
                                    Admin Panel
                                </Link>
                            )}

                            <span className="user-greeting">
                                Hi, {user?.name?.split(" ")[0] || "User"}
                            </span>

                            <button className="logout-btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className={isActive("/") ? "active" : ""}>
                                Home
                            </Link>

                            <Link to="/books" className={isActive("/books") ? "active" : ""}>
                                Books
                            </Link>

                            <Link to="/register" className="signup-nav-link">
                                <button className="signup-btn">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )
                }
            </div>
        </nav>
    );
}

// Export
export default Navbar;
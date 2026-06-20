// Import
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

// Protected Route
function ProtectedRoute({ children, adminOnly = false }) {

    // Auth context details
    const { token, user, loading } = useAuth();

    // Display loader while fetching user profile
    if (loading) {
        return (
            <div className="flex-center-screen">
                <div className="spinner"></div>
                <p style={{ marginTop: '15px', color: '#64748b', fontWeight: '500' }}>Loading session...</p>
            </div>
        );
    }

    // Not logged in
    if (!token) {

        return <Navigate to="/login" replace />;

    }

    // Role-based protection: if adminOnly is requested, verify user role is 'admin'
    if (adminOnly && user && user.role !== "admin") {

        return <Navigate to="/dashboard" replace />;

    }

    // Logged in and authorized
    return children;

}

// Export
export default ProtectedRoute;
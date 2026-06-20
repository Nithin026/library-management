// Import
import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";

// Create context
const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {

    // Store JWT
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    // Store User Profile
    const [user, setUser] = useState(null);

    // Store Loading state
    const [loading, setLoading] = useState(true);

    // Fetch user details when token changes
    useEffect(() => {
        const loadUserProfile = async () => {
            if (token) {
                try {
                    const profile = await getCurrentUser(token);
                    setUser(profile);
                } catch (error) {
                    console.error("Error loading user profile", error);
                    // Invalid token, logout user
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        loadUserProfile();
    }, [token]);

    // Login
    const login = (jwtToken) => {
        localStorage.setItem(
            "token",
            jwtToken
        );
        setToken(jwtToken);
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                token,
                user,
                loading,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

// Export
export default AuthContext;
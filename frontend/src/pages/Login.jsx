import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import useAuth from "../hooks/useAuth";
import "../styles/login.css";

// Login page
function Login() {
    // Form data
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Password visibility toggle
    const [showPassword, setShowPassword] = useState(false);

    // Error message
    const [error, setError] = useState("");

    // Navigation
    const navigate = useNavigate();

    // Auth context
    const { login } = useAuth();

    // Handle input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Login API
            const response = await loginUser(formData);
            
            // Save token
            login(response.access_token);

            // Go to dashboard
            navigate("/dashboard");
        } catch {
            setError("Invalid Email or Password");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="auth-logo-icon">
                            <path d="M6 24V6a3 3 0 0 1 3-3h14v21H9a3 3 0 0 0-3 3z" />
                            <path d="M6 24a3 3 0 0 1 3-3h14v4H9a3 3 0 0 1-3-3z" />
                        </svg>
                        <span>Library</span>
                    </div>
                    <h1>Welcome back</h1>
                    <p className="auth-subtitle">Enter your credentials to manage your catalog</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="login-email">Email Address</label>
                        <div className="input-with-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <input
                                id="login-email"
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="login-password">Password</label>
                        <div className="input-with-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="toggle-icon">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="toggle-icon">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button className="auth-btn" type="submit">
                        Sign In
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
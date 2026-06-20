import { Link } from "react-router-dom";
import "../styles/home.css";

// Home Page
function Home() {
    return (
        <main className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <span className="hero-badge">System Circulations Live</span>
                    <h1>The modern workspace for library cataloging and circulation.</h1>
                    <p>
                        Add resources, organize inventory, issue books, and monitor 
                        real-time borrowing history on a unified, state-of-the-art digital shelf.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/login" className="btn-secondary-link">
                            <button className="btn-secondary">Sign In</button>
                        </Link>
                        <Link to="/register" className="btn-primary-link">
                            <button className="btn-primary">Get Started</button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2>Engineered for libraries. Built for scale.</h2>
                <p className="features-subtitle">Experience a cataloging system configured with clean, role-based workflows for admins and readers alike.</p>

                <div className="feature-list">
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg>
                        </div>
                        <h3>Dynamic Cataloging</h3>
                        <p>Add, update, and manage book metadata, categories, and digital record references effortlessly.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <circle cx="12" cy="11" r="3" />
                            </svg>
                        </div>
                        <h3>Role-Based Access</h3>
                        <p>Secure login portals with strictly partitioned dashboard structures for readers and administrators.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                            </svg>
                        </div>
                        <h3>Circulation Tracking</h3>
                        <p>Issue, return, and check books with one click. Clear audit trails of individual history records.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                                <line x1="18" y1="20" x2="18" y2="10" />
                                <line x1="12" y1="20" x2="12" y2="4" />
                                <line x1="6" y1="20" x2="6" y2="14" />
                            </svg>
                        </div>
                        <h3>Live Circulation Metrics</h3>
                        <p>Review real-time borrowing indicators, total book counts, and return rate indexes on the fly.</p>
                    </div>
                </div>
            </section>

            {/* Bottom Call to Action Section */}
            <section className="home-cta">
                <div className="cta-card">
                    <h2>Elevate your catalog operations today.</h2>
                    <p>Get started in seconds. No complex setup or server deployments required.</p>
                    <Link to="/register">
                        <button className="cta-btn">Create Free Account</button>
                    </Link>
                </div>
            </section>
        </main>
    );
}

// Export
export default Home;
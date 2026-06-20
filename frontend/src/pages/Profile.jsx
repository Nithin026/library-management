import useAuth from "../hooks/useAuth";
import "../styles/profile.css";

function Profile() {
    const { user } = useAuth();

    // Get initials for avatar
    const getInitials = (name) => {
        if (!name) return "?";
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    // Format date
    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        try {
            return new Date(dateStr).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-avatar">
                    {getInitials(user?.name)}
                </div>
                <h1>{user?.name || "Library User"}</h1>
                <span className={`profile-badge ${user?.role || "member"}`}>
                    {user?.role || "Member"}
                </span>

                <div className="profile-details">
                    <div className="detail-row">
                        <span className="detail-label">Email Address</span>
                        <span className="detail-value">{user?.email || "N/A"}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Role Privilege</span>
                        <span className="detail-value" style={{ textTransform: 'capitalize' }}>
                            {user?.role || "Member"}
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Member Since</span>
                        <span className="detail-value">{formatDate(user?.created_at)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

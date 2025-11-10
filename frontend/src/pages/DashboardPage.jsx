import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!token || !userData) {
            navigate('/');
            return;
        }
        setUser(JSON.parse(userData));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) return <div style={{ padding: '20px', color: '#666' }}>Loading...</div>;

    return (
        <div className="dashboard-container">
            {/* Navbar */}
            <nav className="dashboard-navbar">
                <div className="dashboard-logo">
                    <span>📋</span> Kanban App
                </div>
                <div className="dashboard-user-info">
                    <br />
                    <span className="dashboard-username">user: {user.username}</span>
                    <button
                        className="dashboard-logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main content */}
            <main className="dashboard-main-content">
                <div className="dashboard-welcome-section">
                    <h1 className="dashboard-title">Hi {user.username}!</h1>
                    <p className="dashboard-subtitle">You'll find your projects here:</p>
                </div>

                {/* Boards */}
                <div className="dashboard-boards-grid">
                    <div
                        className="dashboard-new-board-card"
                        onClick={() => alert("Not implemented")}
                    >
                        <span className="new-board-icon">+</span>
                        <span className="new-board-text">New board</span>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import KanbanLogo from '../assets/kanban-logo-wout-bg.png'; 

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
    
    const handleProfile = () => {
        navigate('/profile');
    };

    //Test
    const handleNewBoard = () => {
        navigate('/board/testid'); // TODO: replace 'testid' with actual new board id after implementing board creation
    };


    if (!user) return <div style={{ padding: '20px', color: '#666' }}>Loading...</div>;

    return (
        <div className="dashboard-page-wrapper"> 
            <div className="dashboard-centered-content">
                
                <nav className="dashboard-navbar">
                    <div className="dashboard-logo">
                        <img src={KanbanLogo} alt="Kanban App Logo" className="kanban-logo-img" />
                    </div>
                    <div className="dashboard-user-info">
                        <button
                            className="dashboard-profile-btn"
                            onClick={handleProfile}
                        >
                            Profil
                        </button>
                        <button
                            className="dashboard-logout-btn"
                            onClick={handleLogout}
                        >
                            Kijelentkezés
                        </button>
                    </div>
                </nav>

                <div className="dashboard-main-container"> 
                    <main className="dashboard-main-content">
                        <div className="dashboard-welcome-section">
                            <h1 className="dashboard-title">Szia {user.username}!</h1>
                            <p className="dashboard-subtitle">Projektjeit itt találja:</p>
                        </div>

                        <div className="dashboard-boards-grid">
                            <div
                                className="dashboard-new-board-card"
                                //onClick={() => alert("Not implemented")}
                                onClick={handleNewBoard} //Test
                            >
                                <span className="new-board-icon">+</span>
                                <span className="new-board-text">Új tábla</span>
                            </div>

                        </div>
                    </main>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;
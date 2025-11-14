import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import KanbanLogo from '../assets/kanban-logo-wout-bg.png';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [preview, setPreview] = useState('https://via.placeholder.com/120'); 
    const [profilePictureFile, setProfilePictureFile] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (!token || !userData) {
            navigate('/');
            return;
        }
        
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        setUsername(parsedUser.username);
        if (parsedUser.profilePictureUrl) {
            setPreview(parsedUser.profilePictureUrl);
        }

    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/auth');
    };

    const handleDashboard = () => {
        navigate('/dashboard');
    };

    const handleUpdateUsername = (e) => {
        e.preventDefault();
        // TODO: API hívás a username frissítésére
        console.log("Új felhasználónév:", username);
        alert("Felhasználónév frissítve (szimulált)!");
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Az új jelszavak nem egyeznek!");
            return;
        }
        // TODO: API hívás a jelszó cseréjére
        console.log("Jelszócsere adatok:", { currentPassword, newPassword });
        alert("Jelszó frissítve (szimulált)!");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePictureFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePictureUpload = () => {
        if (!profilePictureFile) {
            alert("Először válassz egy képet!");
            return;
        }
        // TODO: API hívás a kép feltöltésére
        console.log("Kép feltöltése:", profilePictureFile.name);
        alert("Profilkép frissítve (szimulált)!");
    };


    if (!user) return <div style={{ padding: '20px', color: 'var(--color-text-muted)' }}>Loading...</div>;

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
                            onClick={handleDashboard}
                        >
                            Vissza a Dashboardra
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
                        <h1 className="profile-title">Profil Beállítások</h1>
                        <div className="profile-content-grid">
                            
                            {/* Profilkép Kártya */}
                            <div className="card">
                                <h2 className="profile-card-title">Profilkép</h2>
                                <div className="profile-picture-section">
                                    <img src={preview} alt="Profilkép előnézet" className="profile-avatar-preview" />
                                                                        <div className="profile-picture-controls">
                                        <label htmlFor="file-upload" className="btn btn-outline">
                                            Kép cseréje
                                        </label>
                                        <input 
                                            id="file-upload" 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handlePictureChange} 
                                            style={{ display: 'none' }} 
                                        />
                                        <button className="btn btn-primary" onClick={handlePictureUpload}>
                                            Feltöltés
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Felhasználónév Kártya */}
                            <div className="card">
                                <h2 className="profile-card-title">Adatok módosítása</h2>
                                <form onSubmit={handleUpdateUsername}>
                                    <div className="profile-form-group">
                                        <label htmlFor="username">Felhasználónév</label>
                                        <input
                                            id="username"
                                            type="text"
                                            className="input"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Név mentése
                                    </button>
                                </form>
                            </div>

                            {/* Jelszó Kártya */}
                            <div className="card">
                                <h2 className="profile-card-title">Jelszó változtatása</h2>
                                <form onSubmit={handleUpdatePassword}>
                                    <div className="profile-form-group">
                                        <label htmlFor="current-pass">Jelenlegi jelszó</label>
                                        <input
                                            id="current-pass"
                                            type="password"
                                            className="input"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="profile-form-group">
                                        <label htmlFor="new-pass">Új jelszó</label>
                                        <input
                                            id="new-pass"
                                            type="password"
                                            className="input"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="profile-form-group">
                                        <label htmlFor="confirm-pass">Új jelszó megerősítése</label>
                                        <input
                                            id="confirm-pass"
                                            type="password"
                                            className="input"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Jelszó cseréje
                                    </button>
                                </form>
                            </div>

                        </div>
                    </main>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import axios from 'axios';

function isValidPassword(password) {
  let minLength = password.length >= 8;
  let hasLower = /[a-z]/.test(password);
  let hasUpper = /[A-Z]/.test(password);
  let hasNumber = /[0-9]/.test(password);
  let hasSpecial = /[!@#&$%_+-]/.test(password);
  
  return minLength && hasLower && hasUpper && hasNumber && hasSpecial;
}

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    useEffect(() => {
        document.title = 'Profil Beállítások | Kanban App';
    }, []);

    const handleUpdateUsername = async (e) => {
        e.preventDefault();
        
        if (!username.trim()) {
            alert('A felhasználónév nem lehet üres!');
            return;
        }

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await axios.put(
                'http://localhost:5500/api/users/profile',
                { username: username },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            const updatedUser = response.data.user;

            setUser(updatedUser);

            if (localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify(updatedUser));
            } else {
                sessionStorage.setItem('user', JSON.stringify(updatedUser));
            }

            alert("Sikeres névváltás!");
        } catch (error) {
            console.error("Hiba a név frissítésekor:", error);

            const message = error.response?.data?.message || "Hiba történt a frissítés során.";
            
            alert(message);
        }

        console.log("Új felhasználónév:", username);
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Az új jelszavak nem egyeznek!");
            return;
        }

        if (!isValidPassword(newPassword)) {
            alert("Az új jelszó nem felel meg a követelményeknek!\n(Minimum 8 karakter, kis- és nagybetű, szám, speciális karakter)");
            return;
        }

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await axios.put(
                'http://localhost:5500/api/users/password',
                { 
                    currentPassword: currentPassword,
                    newPassword: newPassword
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);

        } catch (error) {
            console.error("Hiba a jelszócsere során:", error);
            const message = error.response?.data?.message || "Hiba történt a jelszócsere során.";
            alert(message);
        }

        console.log("Jelszócsere adatok:", { currentPassword, newPassword });
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

    const handlePictureUpload = async () => {
        if (!preview || preview.includes('via.placeholder.com')) {
             alert("Kérlek, válassz ki egy képet először!");
             return;
        }

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await axios.put(
                'http://localhost:5500/api/users/profile-picture',
                { profilePictureUrl: preview }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const updatedUser = response.data.user;
            setUser(updatedUser);

            if (localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify(updatedUser));
            } else {
                sessionStorage.setItem('user', JSON.stringify(updatedUser));
            }

            alert("Profilkép sikeresen feltöltve!");
            setProfilePictureFile(null);

        } catch (error) {
            console.error("Hiba a képfeltöltéskor:", error);
            const message = error.response?.data?.message || "Hiba történt a képfeltöltés során.";
            alert(message);
        }
    };


    if (!user) return <div style={{ padding: '20px', color: 'var(--color-text-muted)' }}>Loading...</div>;

    return (
        <div className="dashboard-main-container profile-main-container">
            <main className="dashboard-main-content">
                
                <h1 className="profile-title">Profil Beállítások</h1>

                <div className="profile-content-grid">

                    {/* Profilkép Kártya */}
                    <div className="card">
                        <h2 className="profile-card-title">Profilkép</h2>
                        <div className="profile-picture-section">
                            <img src={preview} className="profile-avatar-preview" alt="" />
                            <div className="profile-picture-controls">
                                <label htmlFor="file-upload" className="dashboard-logout-btn">
                                    Kép cseréje
                                </label>
                                <input 
                                    id="file-upload" 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handlePictureChange} 
                                    style={{ display: 'none' }} 
                                />
                                <button className="dashboard-logout-btn" onClick={handlePictureUpload}>
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
                            <button type="submit" className="dashboard-logout-btn">
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
                                <div className="password-wrapper">
                                    <input
                                        id="current-pass"
                                        type={showCurrentPassword ? "text" : "password"} 
                                        className="input"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                    <img 
                                        className="password-toggle-icon lightMode"
                                        src={showCurrentPassword 
                                            ? "./public/images/visibility_24dp_000000.svg" 
                                            : "./public/images/visibility_off_24dp_000000.svg"}
                                        alt="Jelszó mutatása"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    />
                                    <img 
                                        className="password-toggle-icon darkMode-icon hide"
                                        src={showCurrentPassword 
                                            ? "./public/images/visibility_24dp_F9FCFF.svg" 
                                            : "./public/images/visibility_off_24dp_F9FCFF.svg"}
                                        alt="Jelszó mutatása"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    />
                                </div>
                            </div>

                            <div className="profile-form-group">
                                <label htmlFor="new-pass">Új jelszó</label>
                                <div className="profile-input-with-help">
                                    <input
                                        id="new-pass"
                                        type={showNewPassword ? "text" : "password"} 
                                        className="input"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />

                                    <img 
                                        className="password-toggle-icon lightMode"
                                        src={showNewPassword 
                                            ? "./public/images/visibility_24dp_000000.svg" 
                                            : "./public/images/visibility_off_24dp_000000.svg"}
                                        alt="Jelszó mutatása"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    />
                                    <img 
                                        className="password-toggle-icon darkMode-icon hide"
                                        src={showNewPassword 
                                            ? "./public/images/visibility_24dp_F9FCFF.svg" 
                                            : "./public/images/visibility_off_24dp_F9FCFF.svg"}
                                        alt="Jelszó mutatása"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    />

                                    <div className="help-wrapper">
                                        <img className="lightMode helpIcon" src="./public/images/help_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="Segítség ikon" />
                                        <img className="darkMode-icon hide helpIcon" src="./public/images/help_24dp_F9FCFF_FILL0_wght400_GRAD0_opsz24.svg" alt="Segítség ikon" />
                                        <div className="tip">
                                            <p>
                                                A jelszónak tartalmaznia kell: <br />
                                                - legalább 8 karaktert <br />
                                                - kis és nagybetűt <br />
                                                - számot <br />
                                                - speciális karaktert (!@#&$%_+-)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-form-group">
                                <label htmlFor="confirm-pass">Új jelszó megerősítése</label>
                                <div className="password-wrapper">
                                    <input
                                        id="confirm-pass"
                                        type={showConfirmPassword ? "text" : "password"} 
                                        className="input"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                     <img 
                                        className="password-toggle-icon lightMode"
                                        src={showConfirmPassword 
                                            ? "./public/images/visibility_24dp_000000.svg" 
                                            : "./public/images/visibility_off_24dp_000000.svg"}
                                        alt="Jelszó mutatása"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />
                                    <img 
                                        className="password-toggle-icon darkMode-icon hide"
                                        src={showConfirmPassword 
                                            ? "./public/images/visibility_24dp_F9FCFF.svg" 
                                            : "./public/images/visibility_off_24dp_F9FCFF.svg"}
                                        alt="Jelszó mutatása"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="dashboard-logout-btn">
                                Jelszó cseréje
                            </button>
                        </form>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
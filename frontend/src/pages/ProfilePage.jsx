import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Profil Oldal</h1>
            <p>Itt lesznek a felhasználói beállítások.</p>
            <br />
            <Link to="/dashboard">Vissza a Dashboardra</Link>
        </div>
    );
};

export default ProfilePage;
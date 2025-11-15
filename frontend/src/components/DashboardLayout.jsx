import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import KanbanLogo from '../assets/kanban-logo-wout-bg.png';
import '../pages/DashboardPage.css';
import ThemeToggle from './ThemeToggle.jsx';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/auth');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="dashboard-page-wrapper">
      <div className="dashboard-centered-content">

        <nav className="dashboard-navbar">
          <div className="dashboard-logo">
            <img src={KanbanLogo} alt="Kanban App Logo" className="kanban-logo-img" />
          </div>
          <div className="dashboard-user-info">
            
            <ThemeToggle />

            {isProfilePage ? (
              <button
                className="dashboard-profile-btn"
                onClick={handleDashboard} 
              >
                Dashboard
              </button>
            ) : (
              <button
                className="dashboard-profile-btn"
                onClick={handleProfile}
              >
                Profil
              </button>
            )}
            
            <button
              className="dashboard-logout-btn"
              onClick={handleLogout}
            >
              Kijelentkezés
            </button>
          </div>
        </nav>
        
        <Outlet />

      </div>
    </div>
  );
}
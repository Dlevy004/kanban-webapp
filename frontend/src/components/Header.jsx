import React from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header-content">
        <h1 className="app-title">Kanban Board</h1>

        <div className="header-right">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

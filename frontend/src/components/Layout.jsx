import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';

export default function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-page">
        <Outlet />
      </main>
    </div>
  );
}

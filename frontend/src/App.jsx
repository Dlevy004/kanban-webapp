import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import BoardPage from './pages/BoardPage.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/board/:id" element={<BoardPage />} />

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { useTheme } from '../theme/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="btn btn-outline"
      onClick={toggleTheme}
      aria-label={isDark ? 'Váltás világos módra' : 'Váltás sötét módra'}
    >
      <span style={{ fontSize: '1.1rem' }}>
        {isDark ? '☀️' : '🌙'}
      </span>
      <span style={{ fontSize: '0.85rem' }}>
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}

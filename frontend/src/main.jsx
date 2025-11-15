import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css' 

import App from './App.jsx'
import { ThemeProvider } from './theme/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
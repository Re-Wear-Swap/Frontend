import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeContext'
import { ArticlesProvider } from './context/ArticlesContext'
import { UserProvider } from './context/UserContext'   // ⭐ AÑADIDO

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>               {/* ⭐ ENVOLVEMOS TODA LA APP */}
        <ThemeProvider>
          <ArticlesProvider>
            <App />
          </ArticlesProvider>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)

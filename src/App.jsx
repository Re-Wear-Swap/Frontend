import { Routes, Route } from 'react-router-dom'
import { HomePage } from './components/pages/HomePage'
import { ProfilePage } from './components/pages/ProfilePage'
import { CatalogPage } from './components/pages/CatalogPage'
import { UploadPage } from './components/pages/UploadPage'

// ⭐ AÑADIDOS
import { LoginPage } from './components/pages/LoginPage'
import { RegisterPage } from './components/pages/RegisterPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/upload" element={<UploadPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}

import { Routes, Route } from 'react-router-dom'
import { HomePage } from './components/pages/HomePage'
import { ProfilePage } from './components/pages/ProfilePage'
import { CatalogPage } from './components/pages/CatalogPage'
import { UploadPage } from './components/pages/UploadPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/upload" element={<UploadPage />} />
    </Routes>
  )
}
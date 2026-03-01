import { Routes, Route } from 'react-router-dom'
import { HomePage } from './components/pages/HomePage'
import { ProfilePage } from './components/pages/ProfilePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}
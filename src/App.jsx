import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './components/pages/HomePage'
import { ProfilePage } from './components/pages/ProfilePage'
import { CatalogPage } from './components/pages/CatalogPage'
import { UploadPage } from './components/pages/UploadPage'
import { ArticleDetailPage } from './components/pages/ArticleDetailPage'
import { EditArticlePage } from './components/pages/EditArticlePage'
import { LoginPage } from './components/pages/LoginPage'
import { RegisterPage } from './components/pages/RegisterPage'
import { useUser } from './context/UserContext'

function PrivateRoute({ children }) {
  const { user } = useUser()
  return user ? children : <Navigate to="/" replace />
}

function PublicOnlyRoute({ children }) {
  const { user } = useUser()
  return user ? <Navigate to="/catalog" replace /> : children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicOnlyRoute><HomePage /></PublicOnlyRoute>} />
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/catalog" element={<PrivateRoute><CatalogPage /></PrivateRoute>} />
      <Route path="/upload" element={<PrivateRoute><UploadPage /></PrivateRoute>} />
      <Route path="/article/:id" element={<PrivateRoute><ArticleDetailPage /></PrivateRoute>} />
      <Route path="/edit/:id" element={<PrivateRoute><EditArticlePage /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

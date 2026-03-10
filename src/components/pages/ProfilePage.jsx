import { useNavigate } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { ProfileInfo } from '../organisms/ProfileInfo'
import { ProfileTabs } from '../organisms/ProfileTabs'
import { useUser } from '../../context/UserContext'

export function ProfilePage() {
  const { user, logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const activeUser = user || {
    name: 'Invitad@',
    username: 'usuario',
    photo: null,
    verified: false,
    points: 0,
    swaps: 0,
  }

  return (
    <HomeTemplate activeTab="perfil">
      <ProfileInfo user={activeUser} />
      <div style={{ padding: '0 16px 8px', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={handleLogout} style={{
          background: 'none', border: '1px solid #fca5a5',
          borderRadius: 8, padding: '8px 16px',
          color: '#ef4444', fontSize: 13, fontWeight: 600,
          cursor: 'pointer',
        }}>
          🚪 Cerrar sesión
        </button>
      </div>
      <ProfileTabs />
    </HomeTemplate>
  )
}

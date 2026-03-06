import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/useTheme'

const TABS = [
  { icon: '🏠', label: 'Inicio', key: 'inicio', path: '/' },
  { icon: '🧭', label: 'Explorar', key: 'explorar', path: '/explore' },
  { icon: '➕', label: 'Subir', key: 'subir', path: '/newarticle' },
  { icon: '👤', label: 'Perfil', key: 'perfil', path: '/profile' },
]

export const BottomNav = ({ active }) => {
  const navigate = useNavigate()
  const { surface, border, text } = useTheme()

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, width: '100%',
      background: surface, borderTop: `1px solid ${border}`,
      display: 'flex', justifyContent: 'space-around',
      padding: '10px 0', zIndex: 10,
    }}>
      {TABS.map(({ icon, label, key, path }) => (
        <div key={key} onClick={() => navigate(path)} style={{ textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: 22 }}>{icon}</div>
          <div style={{ fontSize: 10, fontWeight: 600, color: active === key ? '#9333ea' : text }}>
            {label}
          </div>
        </div>
      ))}
    </nav>
  )
}

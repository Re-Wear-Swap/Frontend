import { useNavigate } from 'react-router-dom'
import logo from '../../assets/IMG/logo.jpg'
import { BottomNav } from '../organisms/BottomNav'
import { useTheme } from '../../context/useTheme'

export const HomeTemplate = ({ children, activeTab = 'inicio' }) => {
  const { isDark, toggleTheme, bg, border } = useTheme()
  const navigate = useNavigate()

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: bg, fontFamily: 'sans-serif' }}>
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 24px', borderBottom: `1px solid ${border}`,
        background: '#1a1025', position: 'sticky', top: 0, zIndex: 10,
      }}>
        <img
          src={logo}
          alt="Re-wear logo"
          onClick={() => navigate('/')}
          style={{ height: 48, width: 'auto', objectFit: 'contain', cursor: 'pointer' }}
        />
        <button onClick={toggleTheme} style={{
          background: 'none', border: 'none', fontSize: 24, cursor: 'pointer'
        }}>
          {isDark ? '🌕' : '🌓'}
        </button>
      </header>
      <main style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {children}
      </main>
      <BottomNav active={activeTab} />
    </div>
  )
}

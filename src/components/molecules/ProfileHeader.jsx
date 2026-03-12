import logo from '../../assets/IMG/logo.jpg'
import { useTheme } from '../../context/useTheme'

export const ProfileHeader = ({ username, onBack }) => {
  const { isDark, toggleTheme, surface, text, border } = useTheme()

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '16px 20px', background: surface,
      position: 'sticky', top: 0, zIndex: 10,
      borderBottom: `1px solid ${border}`,
    }}>
      <img
        src={logo}
        alt="Re-wear logo"
        onClick={onBack}
        style={{ height: 40, width: 'auto', objectFit: 'contain', cursor: 'pointer' }}
      />
      <span style={{ fontWeight: 700, fontSize: 16, color: text }}>@{username}</span>
      <button onClick={toggleTheme} style={{
        background: 'none', border: 'none', fontSize: 24,
        cursor: 'pointer', transition: 'transform 0.3s',
      }}>
        {isDark ? '🌕' : '🌓'}
      </button>
    </div>
  )
}
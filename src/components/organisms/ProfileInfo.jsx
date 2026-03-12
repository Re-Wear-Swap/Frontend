import { useTheme } from '../../context/useTheme'
import { ProfileAvatar } from '../molecules/ProfileAvatar'
import { StatCard } from '../atoms/StatCard'

export const ProfileInfo = ({ user }) => {
  const { text } = useTheme()
  return (
    <div style={{ textAlign: 'center', padding: '0 20px' }}>
      <ProfileAvatar photo={user.photo} verified={user.verified} />
      <h1 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 800, color: text }}>
        ¡Bienvenid@, {user.name}!
      </h1>
      <p style={{ margin: '0 0 24px', color: '#9333ea', fontWeight: 600, fontSize: 15 }}>
        Moda circular e inclusiva
      </p>
      <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
        <StatCard label="TU SALDO" value={user.points} unit="Puntos" />
      </div>
    </div>
  )
}

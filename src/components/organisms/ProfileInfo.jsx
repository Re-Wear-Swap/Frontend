import { ProfileAvatar } from '../molecules/ProfileAvatar'
import { StatCard } from '../atoms/StatCard'

export const ProfileInfo = ({ user }) => (
  <div style={{ textAlign: 'center', padding: '0 20px' }}>
    <ProfileAvatar photo={user.photo} verified={user.verified} />
    <h1 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 800 }}>¡Bienvenid@, {user.name}!</h1>
    <p style={{ margin: '0 0 24px', color: '#9333ea', fontWeight: 600, fontSize: 15 }}>
      Moda circular e inclusiva
    </p>
    <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
      <button style={{
        flex: 1, background: '#9333ea', color: 'white', border: 'none',
        borderRadius: 50, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
      }}>Editar Perfil</button>
      <button style={{
        background: '#f3e8ff', border: 'none', borderRadius: 50,
        width: 50, height: 50, fontSize: 20, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>↗</button>
    </div>
    <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
      <StatCard label="TU SALDO" value={user.points} unit="Puntos" />
      <StatCard label="TRUEQUES" value={user.swaps} />
    </div>
  </div>
)
import { UserAvatarGroup } from '../molecules/UserAvatarGroup'

const USERS = [
  { photo: 'https://randomuser.me/api/portraits/women/44.jpg', online: true },
  { photo: 'https://randomuser.me/api/portraits/men/32.jpg', online: true },
]

export const HeroSection = ({ onRegister, onGuest }) => (
  <section style={{ textAlign: 'center', padding: '32px 24px 24px' }}>
    <UserAvatarGroup users={USERS} />
    <h1 style={{ margin: '20px 0 8px', fontSize: 28, fontWeight: 800 }}>¡Bienvenid@!</h1>
    <p style={{ color: '#9333ea', fontWeight: 600, margin: '0 0 12px', fontSize: 16 }}>
      Trueque juvenil e inclusivo
    </p>
    <span style={{
      background: '#f3e8ff', color: '#7c3aed',
      borderRadius: 20, padding: '4px 14px', fontSize: 13, fontWeight: 700
    }}>
      TEXTO APP
    </span>
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 12,
      maxWidth: 400, margin: '28px auto 0',
    }}>
      <button onClick={onRegister} style={{
        background: '#9333ea', color: 'white', border: 'none',
        borderRadius: 50, padding: '16px', fontSize: 16,
        fontWeight: 700, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
      }}>
        Registrarse
      </button>
      <button onClick={onGuest} style={{
        background: '#f3e8ff', color: '#9333ea', border: 'none',
        borderRadius: 50, padding: '16px', fontSize: 16,
        fontWeight: 700, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
      }}>
        Iniciar Sesión
      </button>
    </div>
  </section>
)

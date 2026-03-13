import { useTheme } from '../../context/useTheme'
import { UserAvatarGroup } from '../molecules/UserAvatarGroup'

const USERS = [
  { photo: 'https://randomuser.me/api/portraits/women/66.jpg', online: true },
  { photo: 'https://randomuser.me/api/portraits/men/77.jpg', online: true },
]

const TRENDING_IMAGES = [
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
  'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&q=80',
  'https://images.unsplash.com/photo-1594938298603-c8148c4b4e24?w=300&q=80',
]

export const HeroSection = ({ onRegister, onGuest }) => {
  const { text } = useTheme()
  return (
    <section style={{ textAlign: 'center', padding: '32px 24px 24px' }}>
      <UserAvatarGroup users={USERS} />
      <h1 style={{ margin: '20px 0 8px', fontSize: 28, fontWeight: 800, color: text }}>¡Bienvenid@!</h1>
      <p style={{ color: '#9333ea', fontWeight: 600, margin: '0 0 12px', fontSize: 16 }}>
        Trueque juvenil e inclusivo
      </p>
      <span style={{
        display: 'block',
        background: '#f3e8ff', color: '#7c3aed',
        borderRadius: 20, padding: '12px 20px', fontSize: 13, fontWeight: 700,
        textAlign: 'center', lineHeight: 1.6,
      }}>
        Rewear es el lugar donde intercambias prendas de forma justa y sostenible.<br />
        Cada artículo que publiques te dará puntos para reservar prendas de otros.<br />
        Al confirmar un intercambio, el sistema se mantiene equilibrado para todos.
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400, margin: '28px auto 0' }}>
        <button onClick={onRegister} style={{
          background: '#9333ea', color: 'white', border: 'none',
          borderRadius: 50, padding: '16px', fontSize: 16,
          fontWeight: 700, cursor: 'pointer',
        }}>Registrarse</button>
        <button onClick={onGuest} style={{
          background: '#f3e8ff', color: '#9333ea', border: 'none',
          borderRadius: 50, padding: '16px', fontSize: 16,
          fontWeight: 700, cursor: 'pointer',
        }}>Iniciar Sesión</button>
      </div>
    </section>
  )
}

export { TRENDING_IMAGES }

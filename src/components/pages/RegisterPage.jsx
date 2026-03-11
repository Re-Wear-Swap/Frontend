import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { useUser } from '../../context/UserContext'
import { useTheme } from '../../context/useTheme'
import { AvatarUploader } from '../molecules/AvatarUploader'

const MAX_SIZE_MB = 2

export function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useUser()
  const { text, surface, border } = useTheme()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState(null)
  const [isAdult, setIsAdult] = useState(false)

  const handlePhoto = (file) => {
    if (!file) { setPhoto(null); return }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`La imagen no puede superar ${MAX_SIZE_MB}MB`)
      return
    }
    setPhoto(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAdult) {
      alert('Debes confirmar que eres mayor de edad para participar en el trueque.')
      return
    }
    await register({ name: username, email, photo, isAdult })
    navigate('/catalog')
  }

  const inputStyle = {
    width: '100%', padding: 12, borderRadius: 12,
    border: `1px solid ${border}`, marginTop: 6,
    background: surface, color: text, boxSizing: 'border-box',
  }

  return (
    <HomeTemplate activeTab="perfil">
      <div style={{ padding: '24px 20px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, color: text }}>¡Hola, Usuari@!</h1>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: text }}>¡Bienvenid@!</h2>
        <p style={{ fontSize: 16, marginBottom: 20, lineHeight: 1.4, color: text }}>
          Únete a la revolución de la moda. <br />
          <strong>1 Prenda = 1 punto</strong>
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ fontSize: 14, fontWeight: 700, color: text }}>Nombre de usuari@</label>
            <input type="text" placeholder="Ej: usuari@_vanguardia" value={username}
              onChange={e => setUsername(e.target.value)} required style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 700, color: text }}>Email</label>
            <input type="email" placeholder="tu@correo.com" value={email}
              onChange={e => setEmail(e.target.value)} required style={inputStyle} />
          </div>
          <AvatarUploader onImageChange={handlePhoto} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: text }}>
            <input type="checkbox" checked={isAdult} onChange={() => setIsAdult(!isAdult)} required />
            Confirmo que soy mayor de edad para participar en el trueque.
          </label>
          <button type="submit" style={{
            background: '#9333ea', color: 'white', padding: '12px 16px',
            borderRadius: 12, border: 'none', fontWeight: 700, cursor: 'pointer', marginTop: 10,
          }}>
            Registrarse
          </button>
        </form>
        <p style={{ marginTop: 20, fontSize: 14, color: text }}>
          ¿Ya eres parte del club?{' '}
          <span onClick={() => navigate('/login')} style={{ color: '#9333ea', fontWeight: 700, cursor: 'pointer' }}>
            Inicia sesión.
          </span>
        </p>
      </div>
    </HomeTemplate>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { useUser } from '../../context/UserContext'

export function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useUser()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState(null)
  const [isAdult, setIsAdult] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAdult) {
      alert("Debes confirmar que eres mayor de edad para participar en el trueque.")
      return
    }

    await register({
      name: username,
      email,
      photo,
      isAdult
    })

    navigate('/profile')
  }

  return (
    <HomeTemplate activeTab="perfil">
      <div style={{ padding: '24px 20px' }}>

        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
          ¡Hola, Usuari@!
        </h1>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          ¡Bienvenid@!
        </h2>

        <p style={{ fontSize: 16, marginBottom: 20, lineHeight: 1.4 }}>
          Únete a la revolución de la moda. <br />
          <strong>1 Prenda = 1 punto</strong>
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* Nombre de usuario */}
          <div>
            <label style={{ fontSize: 14, fontWeight: 700 }}>Nombre de usuari@</label>
            <input
              type="text"
              placeholder="Ej: usuari@_vanguardia"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 12,
                border: '1px solid #ddd',
                marginTop: 6
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ fontSize: 14, fontWeight: 700 }}>Email</label>
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 12,
                border: '1px solid #ddd',
                marginTop: 6
              }}
            />
          </div>

          {/* FOTO DE PERFIL */}
          <div>
            <label style={{ fontSize: 14, fontWeight: 700 }}>Foto de perfil (opcional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setPhoto(e.target.files[0])}
              style={{ marginTop: 6 }}
            />
          </div>

          {/* Checkbox */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
            <input
              type="checkbox"
              checked={isAdult}
              onChange={() => setIsAdult(!isAdult)}
              required
            />
            Confirmo que soy mayor de edad para participar en el trueque.
          </label>

          {/* Botón */}
          <button
            type="submit"
            style={{
              background: '#9333ea',
              color: 'white',
              padding: '12px 16px',
              borderRadius: 12,
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: 10
            }}
          >
            Registrarse
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 14 }}>
          ¿Ya eres parte del club?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{ color: '#9333ea', fontWeight: 700, cursor: 'pointer' }}
          >
            Inicia sesión.
          </span>
        </p>
      </div>
    </HomeTemplate>
  )
}

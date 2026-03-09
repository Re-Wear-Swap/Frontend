import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { useUser } from '../../context/UserContext'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useUser()

  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    login({
      name: email.split('@')[0],
      username: email.split('@')[0],
      email,
      photo: null,
      points: 1,
      swaps: 0,
      verified: true
    })

    navigate('/profile')
  }

  return (
    <HomeTemplate activeTab="perfil">
      <div style={{ padding: '24px 20px' }}>

        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>
          ¡Bienvenid@ de nuevo!
        </h1>

        <p style={{ fontSize: 16, marginBottom: 20 }}>
          Inicia sesión para continuar con tus trueques.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

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
            Iniciar sesión
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 14 }}>
          ¿Aún no tienes cuenta?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ color: '#9333ea', fontWeight: 700, cursor: 'pointer' }}
          >
            Regístrate aquí.
          </span>
        </p>
      </div>
    </HomeTemplate>
  )
}

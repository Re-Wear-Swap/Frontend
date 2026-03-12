import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useArticles } from '../../context/useArticles'
import { createReservation } from '../../services/reservationsService'
import { getReservationByArticle } from '../../services/articlesService'
import { useUser } from '../../context/UserContext'

const STATUS_COLORS = {
  DISPONIBLE: '#22c55e', RESERVADO: '#f59e0b', INTERCAMBIADO: '#9333ea',
}
const STATUS_LABELS = {
  DISPONIBLE: 'Disponible', RESERVADO: 'Reservado', INTERCAMBIADO: 'Intercambiado',
}
const CONDITION_COLORS = {
  NUEVO: '#9333ea', USADO_BUEN_ESTADO: '#888', USADO_REGULAR: '#888',
}

const Countdown = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState('')
  useEffect(() => {
    if (!expiresAt) return
    const interval = setInterval(() => {
      const diff = new Date(expiresAt) - new Date()
      if (diff <= 0) { setTimeLeft('Expirado'); clearInterval(interval); return }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft(`${h}h ${m}m ${s}s`)
    }, 1000)
    return () => clearInterval(interval)
  }, [expiresAt])
  if (!timeLeft) return null
  return <p style={{ margin: '4px 0 0', fontSize: 11, color: '#f59e0b', fontWeight: 700, textAlign: 'center' }}>⏱ Expira en: {timeLeft}</p>
}

export const CatalogCard = ({ id, image, name, description, condition, points, status, isOwn }) => {
  const { changeStatus } = useArticles()
  const { user } = useUser()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [expiresAt, setExpiresAt] = useState(null)

  useEffect(() => {
    if (status === 'RESERVADO' && isOwn) {
      getReservationByArticle(id).then(r => {
        if (r?.expiresAt) setExpiresAt(r.expiresAt)
      })
    }
  }, [status, isOwn, id])

  const handleReservar = async (e) => {
    e.stopPropagation()
    if (!window.confirm('¿Reservar esta prenda? Tienes 24h para completar el intercambio.')) return
    setLoading(true)
    try {
      await createReservation(id, user?.id)
      await changeStatus(id, 'RESERVADO')
    } catch (err) {
      alert('Error al reservar: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleIntercambiar = async (e) => {
    e.stopPropagation()
    if (!window.confirm('¿Marcar como intercambiada?')) return
    setLoading(true)
    try {
      await changeStatus(id, 'INTERCAMBIADO')
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={() => navigate(`/article/${id}`)}
      style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', background: '#f5f5f5', minHeight: 200 }}>
        {image
          ? <img src={image} alt={name} style={{ width: '100%', height: 220, objectFit: 'cover' }} />
          : <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>�</div>
        }
        <span style={{
          position: 'absolute', top: 12, left: 12, background: '#facc15',
          color: '#1a1a1a', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 800,
        }}>{points || 1} PUNTO</span>
        {status && status !== 'DISPONIBLE' && (
          <span style={{
            position: 'absolute', bottom: 8, left: 8,
            background: STATUS_COLORS[status], color: 'white',
            borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 700,
          }}>{STATUS_LABELS[status]}</span>
        )}
      </div>
      <div style={{ padding: '12px 14px 16px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: CONDITION_COLORS[condition] || '#888', letterSpacing: 1 }}>{condition}</p>
        <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 800 }}>{name}</h3>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#888' }}>{description}</p>

        {status === 'DISPONIBLE' && !isOwn && (
          <button onClick={handleReservar} disabled={loading} style={{
            width: '100%', background: '#9333ea', color: 'white',
            border: 'none', borderRadius: 8, padding: '7px',
            fontSize: 12, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
          }}>Reservar</button>
        )}
        {status === 'RESERVADO' && !isOwn && (
          <button disabled style={{
            width: '100%', background: '#e5e7eb', color: '#9ca3af',
            border: 'none', borderRadius: 8, padding: '7px',
            fontSize: 12, fontWeight: 600, cursor: 'not-allowed',
          }}>🔒 Reservado</button>
        )}
        {status === 'RESERVADO' && isOwn && (
          <>
            <button onClick={handleIntercambiar} disabled={loading} style={{
              width: '100%', background: '#f59e0b', color: 'white',
              border: 'none', borderRadius: 8, padding: '7px',
              fontSize: 12, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
            }}>✅ Marcar intercambiado</button>
            <Countdown expiresAt={expiresAt} />
          </>
        )}
        {status === 'DISPONIBLE' && isOwn && (
          <p style={{ margin: 0, fontSize: 11, color: '#aaa', textAlign: 'center' }}>Tu prenda</p>
        )}
        {status === 'INTERCAMBIADO' && (
          <p style={{ margin: 0, fontSize: 11, color: '#9333ea', textAlign: 'center', fontWeight: 700 }}>✓ Intercambiado</p>
        )}
      </div>
    </div>
  )
}

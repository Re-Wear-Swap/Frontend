import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { useArticles } from '../../context/useArticles'
import { useUser } from '../../context/UserContext'
import { useTheme } from '../../context/useTheme'
import { createReservation, cancelReservationByArticle } from '../../services/reservationsService'

export function ArticleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { articles, changeStatus } = useArticles()
  const { user } = useUser()
  const { text, surface, border } = useTheme()
  const [loading, setLoading] = useState(false)

  const article = articles.find(a => a.id === Number(id))

  if (!article) return (
    <HomeTemplate>
      <p style={{ padding: 20, color: text }}>Cargando artículo...</p>
    </HomeTemplate>
  )

  const handleReservar = async () => {
    if (!window.confirm('¿Reservar esta prenda? Tienes 24h para completar el intercambio.')) return
    setLoading(true)
    try {
      await createReservation(article.id, user?.id)
      await changeStatus(article.id, 'RESERVADO')
      navigate('/catalog')
    } catch (err) {
      alert('Error al reservar: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelar = async () => {
    if (!window.confirm('¿Cancelar la reserva? El artículo volverá a estar disponible.')) return
    setLoading(true)
    try {
      await cancelReservationByArticle(article.id)
      await changeStatus(article.id, 'DISPONIBLE')
      navigate('/catalog')
    } catch (err) {
      alert('Error al cancelar: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleIntercambiar = async () => {
    if (!window.confirm('¿Marcar como intercambiada?')) return
    setLoading(true)
    try {
      await changeStatus(article.id, 'INTERCAMBIADO')
      navigate('/profile')
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <HomeTemplate>
      <div style={{ padding: '20px 16px 120px', maxWidth: 600, margin: '0 auto' }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', color: '#9333ea',
          fontWeight: 700, cursor: 'pointer', fontSize: 14, marginBottom: 16,
        }}>← Volver</button>

        <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 18px rgba(0,0,0,0.12)', marginBottom: 20 }}>
          {article.image
            ? <img src={article.image} alt={article.name} style={{ width: '100%', height: 320, objectFit: 'cover' }} />
            : <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>�</div>
          }
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, color: text }}>{article.name}</h1>
        <p style={{ fontSize: 15, color: '#666', marginBottom: 16 }}>{article.description}</p>

        <div style={{ background: surface, padding: 16, borderRadius: 16, border: `1px solid ${border}`, marginBottom: 20 }}>
          <p style={{ color: text, margin: '0 0 8px' }}><strong>Condición:</strong> {article.condition}</p>
          <p style={{ color: text, margin: '0 0 8px' }}><strong>Categoría:</strong> {article.category}</p>
          <p style={{ color: text, margin: 0 }}><strong>Fecha:</strong> {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : '-'}</p>
        </div>

        {article.status === 'DISPONIBLE' && !article.isOwn && (
          <button onClick={handleReservar} disabled={loading} style={{
            width: '100%', background: '#9333ea', color: 'white',
            border: 'none', borderRadius: 12, padding: '14px 0',
            fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
          }}>Reservar prenda</button>
        )}

        {article.status === 'RESERVADO' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {article.isOwn && (
              <button onClick={handleIntercambiar} disabled={loading} style={{
                width: '100%', background: '#f59e0b', color: 'white',
                border: 'none', borderRadius: 12, padding: '14px 0',
                fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
              }}>✅ Marcar intercambiado</button>
            )}
            <button onClick={handleCancelar} disabled={loading} style={{
              width: '100%', background: 'none', color: '#ef4444',
              border: '1px solid #ef4444', borderRadius: 12, padding: '14px 0',
              fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
            }}>✕ Cancelar reserva</button>
          </div>
        )}

        {article.status === 'INTERCAMBIADO' && (
          <p style={{ textAlign: 'center', color: '#9333ea', fontWeight: 700 }}>✓ Esta prenda ya fue intercambiada</p>
        )}

        {article.status === 'DISPONIBLE' && article.isOwn && (
          <p style={{ textAlign: 'center', color: '#aaa' }}>Esta es tu prenda</p>
        )}
      </div>
    </HomeTemplate>
  )
}

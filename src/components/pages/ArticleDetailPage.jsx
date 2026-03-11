import { useParams } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { useArticles } from '../../context/useArticles'

export function ArticleDetailPage() {
  const { id } = useParams()
  const { articles, reserveArticle, cancelReservation } = useArticles()

  const article = articles.find(a => a.id === Number(id))

  if (!article) return (
    <HomeTemplate>
      <p style={{ padding: 20 }}>Cargando artículo...</p>
    </HomeTemplate>
  )

  return (
    <HomeTemplate>
      <div style={{
        padding: '20px 16px 120px',
        maxWidth: 600,
        margin: '0 auto'
      }}>

        {/* Imagen principal */}
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 4px 18px rgba(0,0,0,0.12)',
          marginBottom: 20
        }}>
          <img
            src={article.imageUrl}
            alt={article.title}
            style={{ width: '100%', height: 320, objectFit: 'cover' }}
          />
        </div>

        {/* Título */}
        <h1 style={{
          fontSize: 26,
          fontWeight: 800,
          marginBottom: 8
        }}>
          {article.title}
        </h1>

        {/* Descripción */}
        <p style={{
          fontSize: 15,
          color: '#666',
          marginBottom: 16
        }}>
          {article.description}
        </p>

        {/* Caja de detalles */}
        <div style={{
          background: '#fafafa',
          padding: 16,
          borderRadius: 16,
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          marginBottom: 20
        }}>
          <p><strong>Estado:</strong> {article.itemCondition}</p>
          <p><strong>Categoría:</strong> {article.category}</p>
          <p><strong>Fecha:</strong> {new Date(article.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Botón de acción */}
        {!article.reservation && (
          <button
            onClick={() => reserveArticle(article.id)}
            style={{
              width: '100%',
              background: '#9333ea',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              padding: '12px 0',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 3px 12px rgba(147,51,234,0.3)'
            }}
          >
            Reservar prenda
          </button>
        )}

        {article.reservation && (
          <button
            onClick={() => cancelReservation(article.reservation.id, article.id)}
            style={{
              width: '100%',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              padding: '12px 0',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 3px 12px rgba(239,68,68,0.3)'
            }}
          >
            Cancelar reserva
          </button>
        )}

      </div>
    </HomeTemplate>
  )
}

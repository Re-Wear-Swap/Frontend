import { useParams } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { useArticles } from '../../context/ArticlesContext'

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
      <div style={{ padding: '20px 0 100px' }}>
        <img
          src={article.image}
          alt={article.name}
          style={{ width: '100%', borderRadius: 20, marginBottom: 20 }}
        />

        <h1 style={{ fontSize: 24, fontWeight: 800 }}>{article.name}</h1>
        <p style={{ color: '#888', marginBottom: 12 }}>{article.description}</p>

        <p><strong>Estado:</strong> {article.condition}</p>
        <p><strong>Categoría:</strong> {article.category}</p>

        {!article.reservation && (
          <button
            onClick={() => reserveArticle(article.id)}
            style={{
              marginTop: 20,
              width: '100%',
              background: '#9333ea',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              padding: '14px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Reservar prenda
          </button>
        )}

        {article.reservation && (
          <button
            onClick={() => cancelReservation(article.reservation.id, article.id)}
            style={{
              marginTop: 20,
              width: '100%',
              background: '#f3e8ff',
              color: '#9333ea',
              border: '1px solid #9333ea',
              borderRadius: 12,
              padding: '14px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Cancelar reserva
          </button>
        )}
      </div>
    </HomeTemplate>
  )
}

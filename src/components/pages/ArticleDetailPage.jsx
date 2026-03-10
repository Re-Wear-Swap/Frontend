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
      <div style={{ padding: '20px 0 100px' }}>
        <img src={article.imageUrl} style={{ width: '100%', borderRadius: 20 }} />

        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <p>Estado: {article.itemCondition}</p>
        <p>Categoría: {article.category}</p>
        <p>Fecha: {new Date(article.createdAt).toLocaleDateString()}</p>

        {!article.reservation && (
          <button onClick={() => reserveArticle(article.id)}>
            Reservar
          </button>
        )}

        {article.reservation && (
          <button onClick={() => cancelReservation(article.reservation.id, article.id)}>
            Cancelar reserva
          </button>
        )}
      </div>
    </HomeTemplate>
  )
}

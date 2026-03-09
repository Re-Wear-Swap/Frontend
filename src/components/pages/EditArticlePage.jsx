import { useParams, useNavigate } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { ArticleForm } from '../organisms/ArticleForm'
import { useArticles } from '../../context/ArticlesContext'

export function EditArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { articles, editArticle } = useArticles()

  const article = articles.find(a => a.id === Number(id))

  const handleSubmit = async (formData) => {
    await editArticle(id, formData)
    alert('Artículo actualizado con éxito')
    navigate('/profile')
  }

  if (!article) return (
    <HomeTemplate>
      <p style={{ padding: 20 }}>Cargando artículo...</p>
    </HomeTemplate>
  )

  return (
    <HomeTemplate>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 0 100px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
          Editar prenda
        </h1>
        <ArticleForm onSubmit={handleSubmit} initialData={article} />
      </div>
    </HomeTemplate>
  )
}

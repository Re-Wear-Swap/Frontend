import { useParams, useNavigate } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { ArticleForm } from '../organisms/ArticleForm'
import { useArticles } from '../../context/useArticles'
import { useTheme } from '../../context/useTheme'
import { Modal } from '../atoms/Modal'
import { useModal } from '../../context/useModal'

export function EditArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { articles, editArticle } = useArticles()
  const { text } = useTheme()
  const { modal, showAlert } = useModal()
  const article = articles.find(a => a.id === Number(id))

  const handleSubmit = async (formData) => {
    try {
      await editArticle(id, formData)
      await showAlert('¡Artículo actualizado con éxito!', '¡Listo!')
      navigate('/profile')
    } catch (err) {
      await showAlert('Error al actualizar: ' + err.message, 'Error', 'error')
    }
  }

  if (!article) return (
    <HomeTemplate>
      <p style={{ padding: 20 }}>Cargando artículo...</p>
    </HomeTemplate>
  )

  return (
    <>
      <Modal {...modal} />
      <HomeTemplate>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 0 100px' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: text }}>
            Editar prenda
          </h1>
          <ArticleForm onSubmit={handleSubmit} initialData={article} />
        </div>
      </HomeTemplate>
    </>
  )
}

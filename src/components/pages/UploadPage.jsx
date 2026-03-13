import { useNavigate } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { ArticleForm } from '../organisms/ArticleForm'
import { useArticles } from '../../context/useArticles'
import { useTheme } from '../../context/useTheme'
import { Modal } from '../atoms/Modal'
import { useModal } from '../../context/useModal'

const MAX_SIZE_MB = 5

export function UploadPage() {
  const navigate = useNavigate()
  const { addArticle } = useArticles()
  const { text } = useTheme()
  const { modal, showAlert } = useModal()

  const handleSubmit = async (formData) => {
    if (formData.image && formData.image.size > MAX_SIZE_MB * 1024 * 1024) {
      await showAlert(`La imagen no puede superar ${MAX_SIZE_MB * 1000}KB`, 'Imagen demasiado grande', 'error')
      return
    }
    try {
      await addArticle(formData)
      await showAlert('¡Prenda subida con éxito!', '¡Genial!')
      navigate('/profile')
    } catch (err) {
      await showAlert('Error al subir la prenda: ' + err.message, 'Error', 'error')
    }
  }

  return (
    <>
      <Modal {...modal} />
      <HomeTemplate activeTab="subir">
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 0 100px' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: text }}>
            Subir prenda
          </h1>
          <p style={{ color: '#aaa', marginBottom: 24, fontSize: 14 }}>
            Añade una prenda a tu armario y gana 1 punto
          </p>
          <ArticleForm onSubmit={handleSubmit} />
        </div>
      </HomeTemplate>
    </>
  )
}

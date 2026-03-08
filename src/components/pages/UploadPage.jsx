import { useNavigate } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { ArticleForm } from '../organisms/ArticleForm'
import { useArticles } from '../../context/useArticles'

const MAX_SIZE_MB = 0.1

export function UploadPage() {
  const navigate = useNavigate()
  const { addArticle } = useArticles()

  const handleSubmit = (formData) => {
    if (formData.image && formData.image.size > MAX_SIZE_MB * 1024 * 1024) {
      alert('La imagen no puede superar 0.1MB')
      return
    }
    console.log('Subiendo articulo:', formData)
    addArticle(formData)
    alert('Prenda subida con exito!')
    navigate('/profile')
  }

  return (
    <HomeTemplate activeTab="subir">
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 0 100px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
          Subir prenda
        </h1>
        <p style={{ color: '#aaa', marginBottom: 24, fontSize: 14 }}>
          Añade una prenda a tu armario y gana 1 punto
        </p>
        <ArticleForm onSubmit={handleSubmit} />
      </div>
    </HomeTemplate>
  )
}

import { useNavigate } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { ArticleForm } from '../organisms/ArticleForm'
import { useTheme } from '../../context/useTheme'

export function UploadPage() {
  const navigate = useNavigate()
  const { text } = useTheme()

  const handleSubmit = (formData) => {
    console.log('Prenda subida:', formData)
    // aquí irá la llamada a la API
    alert('¡Prenda subida con éxito!')
    navigate('/profile')
  }

  return (
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
  )
}
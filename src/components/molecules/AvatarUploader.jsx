import { useState } from 'react'
import { useTheme } from '../../context/useTheme'

const MAX_SIZE_MB = 2

export const AvatarUploader = ({ onImageChange }) => {
  const { border } = useTheme()
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`La foto no puede superar ${MAX_SIZE_MB}MB`)
      return
    }
    setPreview(URL.createObjectURL(file))
    onImageChange(file)
  }

  const handleRemove = (e) => {
    e.preventDefault()
    setPreview(null)
    onImageChange(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 14, fontWeight: 700 }}>Foto de perfil (opcional)</label>
      {preview ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <img
            src={preview}
            alt="avatar"
            style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `3px solid #9333ea` }}
          />
          <button onClick={handleRemove} style={{
            background: 'none', border: '1px solid #fca5a5',
            borderRadius: 20, padding: '4px 14px',
            color: '#ef4444', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>✕ Eliminar foto</button>
        </div>
      ) : (
        <label style={{
          border: `2px dashed ${border}`, borderRadius: 16, padding: '20px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', gap: 8,
        }}>
          <span style={{ fontSize: 40 }}>👤</span>
          <span style={{ fontSize: 13, color: '#9333ea', fontWeight: 600 }}>Subir foto de perfil</span>
          <span style={{ fontSize: 11, color: '#aaa' }}>JPG, PNG hasta {MAX_SIZE_MB}MB</span>
          <input type="file" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
        </label>
      )}
    </div>
  )
}

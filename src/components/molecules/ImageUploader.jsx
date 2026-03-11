import { useState } from 'react'
import { useTheme } from '../../context/useTheme'

export const ImageUploader = ({ onImageChange, currentImage }) => {
  const { border } = useTheme()
  const [preview, setPreview] = useState(currentImage || null)

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
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
      <label style={{ fontSize: 13, fontWeight: 700, color: '#1a0533' }}>Imagen</label>
      {preview ? (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={preview}
            alt="preview"
            style={{ width: '100%', maxHeight: 200, borderRadius: 12, objectFit: 'contain', border: `2px dashed ${border}` }}
          />
          <button
            onClick={handleRemove}
            style={{
              position: 'absolute', top: 8, right: 8,
              background: '#ef4444', color: 'white', border: 'none',
              borderRadius: 20, padding: '4px 10px',
              fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}
          >✕ Borrar</button>
        </div>
      ) : (
        <label style={{
          border: `2px dashed ${border}`, borderRadius: 16, padding: '24px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', gap: 8, minHeight: 160,
        }}>
          <span style={{ fontSize: 40 }}>📷</span>
          <span style={{ fontSize: 13, color: '#9333ea', fontWeight: 600 }}>Subir foto de la prenda</span>
          <span style={{ fontSize: 11, color: '#aaa' }}>JPG, PNG hasta 5MB</span>
          <input type="file" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
        </label>
      )}
    </div>
  )
}

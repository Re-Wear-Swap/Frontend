import { useState } from 'react'
import { useTheme } from '../../context/useTheme'
import { InputField } from '../atoms/InputField'
import { TextAreaField } from '../atoms/TextAreaField'
import { SelectField } from '../atoms/SelectField'
import { ImageUploader } from '../molecules/ImageUploader'

const CONDITIONS = [
  { value: 'Nuevo', label: 'Nuevo' },
  { value: 'Usado: Buen estado', label: 'Usado: Buen estado' },
  { value: 'Usado: Regular', label: 'Usado: Regular' },
]

const CATEGORIES = [
  { value: 'camisetas', label: 'Camisetas' },
  { value: 'pantalones', label: 'Pantalones' },
  { value: 'chaquetas', label: 'Chaquetas' },
  { value: 'vestidos', label: 'Vestidos' },
  { value: 'accesorios', label: 'Accesorios' },
  { value: 'calzado', label: 'Calzado' },
]

export const ArticleForm = ({ onSubmit }) => {
  const { surface, text, border } = useTheme()
  const [form, setForm] = useState({
    name: '', description: '', condition: '', category: '', image: null,
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImage = (file) => {
    setForm(prev => ({ ...prev, image: file }))
  }

  const handleSubmit = () => {
    if (!form.name || !form.condition || !form.category) {
      alert('Por favor rellena los campos obligatorios')
      return
    }
    onSubmit(form)
  }

  return (
    <div style={{
      background: surface, borderRadius: 20,
      padding: 24, display: 'flex', flexDirection: 'column', gap: 20,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    }}>
      <ImageUploader onImageChange={handleImage} />

      <InputField
        label="Nombre de la prenda *"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Ej: Camiseta oversize blanca"
      />

      <TextAreaField
        label="Descripción"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Describe la prenda, talla, detalles..."
      />

      <SelectField
        label="Condición *"
        name="condition"
        value={form.condition}
        onChange={handleChange}
        options={CONDITIONS}
      />

      <SelectField
        label="Categoría *"
        name="category"
        value={form.category}
        onChange={handleChange}
        options={CATEGORIES}
      />

      <button
        onClick={handleSubmit}
        style={{
          background: '#9333ea', color: 'white', border: 'none',
          borderRadius: 50, padding: '16px', fontSize: 16,
          fontWeight: 700, cursor: 'pointer', marginTop: 8,
        }}
      >
        Subir prenda
      </button>
    </div>
  )
}
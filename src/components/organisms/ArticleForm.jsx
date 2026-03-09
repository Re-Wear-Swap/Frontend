import { useState } from 'react'
import { useTheme } from '../../context/useTheme'
import { InputField } from '../atoms/InputField'
import { TextAreaField } from '../atoms/TextAreaField'
import { SelectField } from '../atoms/SelectField'
import { ImageUploader } from '../molecules/ImageUploader'

const CONDITIONS = [
  { value: 'NUEVO', label: 'Nuevo' },
  { value: 'USADO_BUEN_ESTADO', label: 'Buen estado' },
  { value: 'USADO_REGULAR', label: 'Regular' },
]

const CATEGORIES = [
  { value: 'CAMISETAS', label: 'Camisetas' },
  { value: 'PANTALONES', label: 'Pantalones' },
  { value: 'CHAQUETAS', label: 'Chaquetas' },
  { value: 'VESTIDOS', label: 'Vestidos' },
  { value: 'ZAPATOS', label: 'Zapatos' },
  { value: 'ACCESORIOS', label: 'Accesorios' },
  { value: 'OTROS', label: 'Otros' },
]

export const ArticleForm = ({ onSubmit, initialData }) => {
  const { surface } = useTheme()
  const [form, setForm] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    itemCondition: initialData?.condition || '',
    category: initialData?.category || '',
    image: null,
  })
  
  

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImage = (file) => {
    setForm(prev => ({ ...prev, image: file }))
  }

  const handleSubmit = () => {
    if (!form.name || !form.itemCondition || !form.category) {
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
        name="itemCondition"
        value={form.itemCondition}
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
      <button onClick={handleSubmit} style={{
        background: '#9333ea', color: 'white', border: 'none',
        borderRadius: 50, padding: '16px', fontSize: 16,
        fontWeight: 700, cursor: 'pointer', marginTop: 8,
      }}>
        Subir prenda
      </button>
    </div>
  )
}

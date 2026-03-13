import { useNavigate } from 'react-router-dom'
import { useArticles } from '../../context/useArticles'
import { useTheme } from '../../context/useTheme'
import { Modal } from '../atoms/Modal'
import { useModal } from '../../context/useModal'

const CONDITION_LABELS = {
  NUEVO: 'Nuevo', USADO_BUEN_ESTADO: 'Buen estado', USADO_REGULAR: 'Regular',
}
const STATUS_COLORS = {
  DISPONIBLE: '#22c55e', RESERVADO: '#f59e0b', INTERCAMBIADO: '#9333ea',
}
const STATUS_LABELS = {
  DISPONIBLE: 'Disponible', RESERVADO: 'Reservado', INTERCAMBIADO: 'Intercambiado',
}

export const ClothingCard = ({ id, image, name, condition, status, isEmpty, onAdd, isOwn }) => {
  const { removeArticle } = useArticles()
  const { surface, border, text } = useTheme()
  const navigate = useNavigate()
  const { modal, showConfirm } = useModal()

  if (isEmpty) return (
    <div onClick={onAdd} style={{
      background: surface, borderRadius: 16, border: `2px dashed ${border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: 180, cursor: 'pointer', flexDirection: 'column', gap: 8,
    }}>
      <span style={{ fontSize: 32 }}>+</span>
      <span style={{ fontSize: 13, color: '#9333ea', fontWeight: 600 }}>Añadir prenda</span>
    </div>
  )

  const handleDelete = async (e) => {
    e.stopPropagation()
    const ok = await showConfirm('¿Eliminar esta prenda?', 'Eliminar prenda')
    if (ok) await removeArticle(id)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    navigate(`/edit/${id}`)
  }

  return (
    <>
      <Modal {...modal} />
      <div onClick={() => navigate(`/article/${id}`)} style={{
        background: surface, borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer', position: 'relative',
      }}>
        <div style={{ position: 'relative', height: 160, background: '#f5f5f5' }}>
          {image
            ? <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>�</div>
          }
          {status && status !== 'DISPONIBLE' && (
            <span style={{
              position: 'absolute', bottom: 6, left: 6,
              background: STATUS_COLORS[status], color: 'white',
              borderRadius: 20, padding: '3px 8px', fontSize: 10, fontWeight: 700,
            }}>{STATUS_LABELS[status]}</span>
          )}
        </div>
        <div style={{ padding: '10px 12px 12px' }}>
          <p style={{ margin: 0, fontSize: 12, color: '#888' }}>{CONDITION_LABELS[condition] || condition}</p>
          <h4 style={{ margin: '2px 0 8px', fontSize: 14, fontWeight: 700, color: text }}>{name}</h4>
          {isOwn && status !== 'INTERCAMBIADO' && (
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={handleEdit} style={{
                flex: 1, background: '#f3e8ff', color: '#9333ea',
                border: 'none', borderRadius: 8, padding: '5px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
              }}>✏️ Editar</button>
              <button onClick={handleDelete} style={{
                flex: 1, background: '#fee2e2', color: '#ef4444',
                border: 'none', borderRadius: 8, padding: '5px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
              }}>🗑️ Eliminar</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

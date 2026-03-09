import { useArticles } from '../../context/useArticles'

const STATUS_COLORS = {
  Disponible: '#22c55e',
  Reservado: '#9333ea',
  Intercambiado: '#f59e0b',
}

export const ClothingCard = ({ id, image, name, condition, points, status, isEmpty, onAdd, isOwn }) => {
  const { removeArticle } = useArticles()

  const handleDelete = () => {
    if (window.confirm('Eliminar esta prenda?')) {
      removeArticle(id)
    }
  }

  if (isEmpty) return (
    <div onClick={onAdd} style={{
      background: '#faf5ff', borderRadius: 16, border: '2px dashed #c084fc',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: 200, cursor: 'pointer', gap: 8,
    }}>
      <span style={{ fontSize: 32, color: '#9333ea' }}>+</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#9333ea', letterSpacing: 1 }}>SUBIR PRENDA</span>
    </div>
  )

  return (
    <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'relative' }}>
      <div style={{ position: 'relative', background: '#f3f3f3', height: 180 }}>
        {image
          ? <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>👕</div>
        }
        <span style={{
          position: 'absolute', top: 8, right: 8,
          background: '#9333ea', color: 'white',
          borderRadius: 20, padding: '3px 8px', fontSize: 11, fontWeight: 700,
        }}>{points} PUNTO</span>
        {status && (
          <span style={{
            position: 'absolute', bottom: 8, left: 8,
            background: STATUS_COLORS[status] || '#9333ea',
            color: 'white', borderRadius: 20,
            padding: '4px 10px', fontSize: 11, fontWeight: 700,
          }}>{status}</span>
        )}
      </div>
      <div style={{ padding: '10px 12px 14px' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700 }}>{name}</h3>
        <p style={{ margin: 0, fontSize: 12, color: '#888' }}>{condition}</p>
        {isOwn && (
          <button onClick={handleDelete} style={{
            marginTop: 8, width: '100%',
            background: 'none', border: '1px solid #fca5a5',
            borderRadius: 8, padding: '6px',
            color: '#ef4444', fontSize: 12, fontWeight: 600,
            cursor: 'pointer',
          }}>
            🗑 Eliminar
          </button>
        )}
        {isOwn && (
  <button
    onClick={() => window.location.href = `/edit/${id}`}
    style={{
      marginTop: 8,
      width: '100%',
      background: '#f3e8ff',
      border: '1px solid #c084fc',
      borderRadius: 8,
      padding: '6px',
      color: '#9333ea',
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer',
    }}
  >
    ✏️ Editar
  </button>
)}

      </div>
    </div>
  )
}

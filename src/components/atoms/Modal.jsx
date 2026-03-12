import { useTheme } from '../../context/useTheme'

export const Modal = ({ isOpen, title, message, type = 'confirm', onConfirm, onCancel }) => {
  const { surface, text, border } = useTheme()
  if (!isOpen) return null

  const isAlert = type === 'alert'
  const isError = type === 'error'

  const colors = {
    confirm: { bg: '#9333ea', label: 'Confirmar' },
    alert:   { bg: '#22c55e', label: 'Entendido' },
    error:   { bg: '#ef4444', label: 'Cerrar' },
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        background: surface, borderRadius: 20, padding: 28,
        maxWidth: 360, width: '100%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        border: `1px solid ${border}`,
      }}>
        {title && <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 800, color: text }}>{title}</h3>}
        <p style={{ margin: '0 0 24px', fontSize: 14, color: text, lineHeight: 1.5 }}>{message}</p>
        <div style={{ display: 'flex', gap: 10 }}>
          {!isAlert && !isError && (
            <button onClick={onCancel} style={{
              flex: 1, padding: '10px', borderRadius: 10, border: `1px solid ${border}`,
              background: 'transparent', color: text, fontWeight: 600, cursor: 'pointer', fontSize: 14,
            }}>Cancelar</button>
          )}
          <button onClick={onConfirm} style={{
            flex: 1, padding: '10px', borderRadius: 10, border: 'none',
            background: colors[type]?.bg || '#9333ea', color: 'white',
            fontWeight: 700, cursor: 'pointer', fontSize: 14,
          }}>{colors[type]?.label}</button>
        </div>
      </div>
    </div>
  )
}

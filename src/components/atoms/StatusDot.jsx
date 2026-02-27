export const StatusDot = ({ status }) => {
  const colors = {
    nuevo: '#22c55e',
    bueno: '#3b82f6',
    usado: '#eab308',
  }
  const label = {
    nuevo: 'Nuevo',
    bueno: 'Usado buen estado',
    usado: 'Usado regular',
  }
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
      <span style={{
        width: 10, height: 10, borderRadius: '50%',
        background: colors[status], display: 'inline-block'
      }} />
      {label[status]}
    </span>
  )
}
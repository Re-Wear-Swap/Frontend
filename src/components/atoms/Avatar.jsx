export const Avatar = ({ src, online }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <img src={src} alt="avatar" style={{
      width: 72, height: 72, borderRadius: '50%',
      border: '3px solid #c084fc', objectFit: 'cover'
    }} />
    {online && (
      <span style={{
        position: 'absolute', bottom: 4, right: 4,
        width: 14, height: 14, borderRadius: '50%',
        background: '#22c55e', border: '2px solid white'
      }} />
    )}
  </div>
)
import { StatusDot } from '../atoms/StatusDot'

const placeholderColors = ['#e9d5ff', '#dbeafe', '#fef9c3', '#fce7f3']

export const ProductCard = ({ image, name, condition, points, id }) => (
  <div style={{
    background: 'white', borderRadius: 16,
    overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  }}>
    <div style={{
      position: 'relative',
      background: placeholderColors[(id - 1) % placeholderColors.length],
      height: 160,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {image
        ? <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12 }} />
        : <span style={{ fontSize: 48 }}>👕</span>
      }
      <span style={{
        position: 'absolute', top: 10, left: 10,
        background: '#9333ea', color: 'white',
        borderRadius: 20, padding: '4px 10px', fontSize: 12, fontWeight: 700
      }}>
        {points} PUNTO
      </span>
    </div>
    <div style={{ padding: '10px 14px 14px' }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700 }}>{name}</h3>
      <StatusDot status={condition} />
    </div>
  </div>
)
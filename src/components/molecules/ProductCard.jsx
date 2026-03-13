import { StatusDot } from '../atoms/StatusDot'

const placeholderColors = ['#e9d5ff', '#dbeafe', '#fef9c3', '#fce7f3']
const placeholderImages = [
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
  'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&q=80',
  'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&q=80',
]

export const ProductCard = ({ image, name, condition, points, id }) => (
  <div
    onClick={() => window.location.href = `/article/${id}`}
    style={{
      background: 'white',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      cursor: 'pointer'
    }}
  >
    <div style={{
      position: 'relative',
      background: placeholderColors[(id - 1) % placeholderColors.length],
      height: 160,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {image ? (
        <img
          src={image}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: 12
          }}
        />
      ) : (
        <img
          src={placeholderImages[(id - 1) % placeholderImages.length]}
          alt="ropa"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      <span style={{
        position: 'absolute',
        top: 10,
        left: 10,
        background: '#9333ea',
        color: 'white',
        borderRadius: 20,
        padding: '4px 10px',
        fontSize: 12,
        fontWeight: 700
      }}>
        {points} PUNTO
      </span>
    </div>
    <div style={{ padding: '10px 14px 14px' }}>
      <h3 style={{
        margin: '0 0 6px',
        fontSize: 15,
        fontWeight: 700
      }}>
        {name}
      </h3>
      <StatusDot status={condition} />
    </div>
  </div>
)
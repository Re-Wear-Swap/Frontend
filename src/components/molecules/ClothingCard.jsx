const STATUS_COLORS = {
  DISPONIBLE: '#22c55e',
  RESERVADO: '#9333ea',
  INTERCAMBIADO: '#f59e0b',
};

export const ClothingCard = ({ imageUrl, title, itemCondition, articleStatus, user }) => {
  const points = user?.points ?? 1;

  return (
    <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div style={{ position: 'relative', background: '#f3f3f3', height: 180 }}>
        {imageUrl
          ? <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>👕</div>
        }

        <span style={{
          position: 'absolute', top: 8, right: 8,
          background: '#9333ea', color: 'white',
          borderRadius: 20, padding: '3px 8px', fontSize: 11, fontWeight: 700,
        }}>{points} PUNTO</span>

        {articleStatus && (
          <span style={{
            position: 'absolute', bottom: 8, left: 8,
            background: STATUS_COLORS[articleStatus] || '#9333ea',
            color: 'white', borderRadius: 20,
            padding: '4px 10px', fontSize: 11, fontWeight: 700,
          }}>{articleStatus}</span>
        )}
      </div>

      <div style={{ padding: '10px 12px 14px' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 12, color: '#888' }}>{itemCondition}</p>
      </div>
    </div>
  );
};

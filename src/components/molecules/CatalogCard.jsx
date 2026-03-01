export const CatalogCard = ({ image, name, description, condition, points, owners }) => {
    const conditionColor = condition === 'NUEVO' ? '#9333ea' : '#888'

    return (
        <div style={{
            background: 'white',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        }}>
            <div style={{ position: 'relative', background: '#f5f5f5', minHeight: 200 }}>
                {image
                    ? <img src={image} alt={name} style={{ width: '100%', height: 220, objectFit: 'cover' }} />
                    : <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>👕</div>
                }
                <span style={{
                    position: 'absolute', top: 12, left: 12,
                    background: '#facc15', color: '#1a1a1a',
                    borderRadius: 20, padding: '4px 12px',
                    fontSize: 12, fontWeight: 800,
                }}>
                    {points} PUNTO
                </span>
                {owners && owners.length > 0 && (
                    <div style={{
                        position: 'absolute', bottom: 10, left: 12,
                        display: 'flex',
                    }}>
                        {owners.map((o, i) => (
                            <div key={i} style={{
                                width: 28, height: 28, borderRadius: '50%',
                                border: '2px solid white',
                                marginLeft: i > 0 ? -8 : 0,
                                background: '#e9d5ff',
                                overflow: 'hidden',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 14,
                            }}>
                                {o.photo
                                    ? <img src={o.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    : '👤'
                                }
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div style={{ padding: '12px 14px 16px' }}>
                <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: conditionColor, letterSpacing: 1 }}>
                    {condition}
                </p>
                <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 800 }}>{name}</h3>
                <p style={{ margin: 0, fontSize: 13, color: '#888' }}>{description}</p>
            </div>
        </div>
    )
}
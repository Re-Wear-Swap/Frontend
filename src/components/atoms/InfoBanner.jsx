export const InfoBanner = ({ text }) => (
    <div style={{
        background: '#fefce8',
        border: '1px solid #fde68a',
        borderRadius: 50,
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        margin: '0 16px',
        fontSize: 14,
        fontWeight: 600,
        color: '#92400e',
    }}>
        <span style={{ fontSize: 18 }}>⭐</span>
        {text}
    </div>
)
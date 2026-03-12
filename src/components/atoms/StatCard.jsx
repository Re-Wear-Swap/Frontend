export const StatCard = ({ label, value, unit }) => (
    <div style={{
        background: '#f3e8ff',
        borderRadius: 16,
        padding: '16px 20px',
        flex: 1,
    }}>
        <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 600, color: '#9333ea', letterSpacing: 1 }}>
            {label}
        </p>
        <p style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#1a0533' }}>
            {value} {unit && <span style={{ fontSize: 16, fontWeight: 600, color: '#9333ea' }}>{unit}</span>}
        </p>
    </div>
)
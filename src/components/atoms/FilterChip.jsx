export const FilterChip = ({ label, active, onClick }) => (
    <button onClick={onClick} style={{
        background: active ? '#9333ea' : 'white',
        color: active ? 'white' : '#333',
        border: '1px solid #e9d5ff',
        borderRadius: 50,
        padding: '8px 16px',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
    }}>
        {label} <span style={{ fontSize: 10 }}>▾</span>
    </button>
)
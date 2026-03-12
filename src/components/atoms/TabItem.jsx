export const TabItem = ({ label, active, onClick }) => (
    <button onClick={onClick} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: 15, fontWeight: active ? 700 : 500,
        color: active ? '#9333ea' : '#aaa',
        paddingBottom: 10,
        borderBottom: active ? '2px solid #9333ea' : '2px solid transparent',
        transition: 'all 0.2s',
    }}>
        {label}
    </button>
)
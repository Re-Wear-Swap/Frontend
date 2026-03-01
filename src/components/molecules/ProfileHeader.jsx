export const ProfileHeader = ({ username, onBack, onSettings }) => (
    <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 20px', background: 'white',
        position: 'sticky', top: 0, zIndex: 10,
        borderBottom: '1px solid #f3e8ff',
    }}>
        <button onClick={onBack} style={{
            background: 'none', border: 'none', fontSize: 22, cursor: 'pointer'
        }}>←</button>
        <span style={{ fontWeight: 700, fontSize: 16 }}>@{username}</span>
        <button onClick={onSettings} style={{
            background: 'none', border: 'none', fontSize: 22, cursor: 'pointer'
        }}>⚙️</button>
    </div>
)
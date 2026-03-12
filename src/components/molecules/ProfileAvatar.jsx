export const ProfileAvatar = ({ photo, verified }) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 16px' }}>
        <div style={{ position: 'relative' }}>
            <div style={{
                width: 110, height: 110, borderRadius: '50%',
                border: '3px solid #9333ea', padding: 3,
                background: 'white',
            }}>
                {photo
                    ? <img src={photo} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>👤</div>
                }
            </div>
            {verified && (
                <div style={{
                    position: 'absolute', bottom: 4, right: 4,
                    background: '#9333ea', borderRadius: '50%',
                    width: 24, height: 24, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    border: '2px solid white', fontSize: 12,
                }}>✓</div>
            )}
        </div>
    </div>
)
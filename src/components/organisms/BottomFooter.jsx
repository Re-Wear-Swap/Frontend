import { useNavigate } from 'react-router-dom'

const TABS = [
    { icon: '🏠', label: 'Inicio', key: 'inicio', path: '/' },
    { icon: '👗', label: 'Catálogo', key: 'catalogo', path: '/catalog' },
    { icon: '➕', label: 'Subir', key: 'subir', path: '/upload' },
    { icon: '👤', label: 'Perfil', key: 'perfil', path: '/profile' },
]

export const BottomNav = ({ active }) => {
    const navigate = useNavigate()

    return (
        <nav style={{
            position: 'fixed', bottom: 0, left: 0, width: '100%',
            background: 'white', borderTop: '1px solid #e9d5ff',
            display: 'flex', justifyContent: 'space-around',
            padding: '10px 0', zIndex: 10,
        }}>
            {TABS.map(({ icon, label, key, path }) => (
                <div key={key} onClick={() => navigate(path)} style={{ textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ fontSize: 22 }}>{icon}</div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: active === key ? '#9333ea' : '#aaa' }}>
                        {label}
                    </div>
                </div>
            ))}
        </nav>
    )
}
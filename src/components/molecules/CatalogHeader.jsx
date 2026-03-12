export const CatalogHeader = ({ onMenu, onSearch }) => (
    <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 20px',
        background: 'white',
        position: 'sticky', top: 0, zIndex: 10,
        borderBottom: '1px solid #f3e8ff',
    }}>
        <button onClick={onMenu} style={{
            background: '#f3e8ff', border: 'none', borderRadius: 12,
            width: 40, height: 40, fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>☰</button>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Catálogo Re-wear</h2>
        <button onClick={onSearch} style={{
            background: '#f3e8ff', border: 'none', borderRadius: 12,
            width: 40, height: 40, fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#9333ea',
        }}>🔍</button>
    </div>
)
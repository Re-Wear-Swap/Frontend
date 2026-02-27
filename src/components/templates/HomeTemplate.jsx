import logo from '../../assets/IMG/logo.jpg'

export const HomeTemplate = ({ hero, grid }) => (
  <div style={{
    width: '100%',
    minHeight: '100vh',
    background: '#f8f5ff',
    fontFamily: 'sans-serif',
  }}>
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      borderBottom: '1px solid #3a2a5a',
      background: '#1a1025',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <img src={logo} alt="Re-wear logo" style={{
        height: 48,
        width: 'auto',
        objectFit: 'contain'
      }} />
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'white' }}>Re-wear</h2>
      <span style={{ fontSize: 26, cursor: 'pointer', color: 'white' }}>🔍</span> {/* aqui irá el darkmode */}
    </header>

    <main style={{
      maxWidth: 900,
      margin: '0 auto',
      padding: '0 16px',
    }}>
      {hero}
      {grid}
    </main>

    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      background: 'white',
      borderTop: '1px solid #e9d5ff',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px 0',
      zIndex: 10,
    }}>
      {[
        { icon: '🏠', label: 'INICIO', active: true },
        { icon: '🧭', label: 'EXPLORAR' },
        { icon: '⭕', label: 'MIS PUNTOS' },
        { icon: '👤', label: 'PERFIL' },
      ].map(({ icon, label, active }) => (
        <div key={label} style={{ textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: 22 }}>{icon}</div>
          <div style={{
            fontSize: 10, fontWeight: 600,
            color: active ? '#9333ea' : '#aaa'
          }}>
            {label}
          </div>
        </div>
      ))}
    </nav>
  </div>
)
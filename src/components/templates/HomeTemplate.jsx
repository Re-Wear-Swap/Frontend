import logo from '../../assets/IMG/logo.jpg'
import { BottomNav } from '../organisms/BottomNav'

export const HomeTemplate = ({ hero, grid }) => (
  <div style={{ width: '100%', minHeight: '100vh', background: '#f8f5ff', fontFamily: 'sans-serif' }}>
    <header style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 24px', borderBottom: '1px solid #3a2a5a',
      background: '#1a1025', position: 'sticky', top: 0, zIndex: 10,
    }}>
      <img src={logo} alt="Re-wear logo" style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'white' }}>Re-wear</h2>
      <span style={{ fontSize: 26, cursor: 'pointer', color: 'white' }}>Ì¥ç</span>
    </header>
    <main style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      {hero}
      {grid}
    </main>
    <BottomNav active="inicio" />
  </div>
)

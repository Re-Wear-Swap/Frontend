import { ProductCard } from '../molecules/ProductCard'

const PRODUCTS = [
  { id: 1, name: 'Camiseta Básica', condition: 'nuevo', points: 1 },
  { id: 2, name: 'Vaqueros Slim', condition: 'bueno', points: 1 },
  { id: 3, name: 'Chaqueta Punto', condition: 'nuevo', points: 1 },
  { id: 4, name: 'Cazadora Biker', condition: 'usado', points: 1 },
]

export const ProductGrid = ({ onViewAll }) => (
  <section style={{ padding: '0 16px 100px' }}>
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', marginBottom: 16
    }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Catálogo Reciente</h2>
      <button onClick={onViewAll} style={{
        background: 'none', border: 'none', color: '#9333ea',
        fontWeight: 600, cursor: 'pointer', fontSize: 14
      }}>
        Ver todo
      </button>
    </div>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: 12
    }}>
      {PRODUCTS.map(p => <ProductCard key={p.id} {...p} />)}
    </div>
  </section>
)
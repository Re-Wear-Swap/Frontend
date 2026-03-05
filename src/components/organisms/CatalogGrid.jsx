import { CatalogCard } from '../molecules/CatalogCard'

const PRODUCTS = [
  { id: 1, name: 'Chaqueta Denim', description: 'Estilo sin género', condition: 'Nuevo', points: 1, owners: [{ photo: null }, { photo: null }] },
  { id: 2, name: 'Camiseta Algodón', description: 'Talle inclusivo', condition: 'Buen estado', points: 1, owners: [{ photo: null }] },
  { id: 3, name: 'Pantalón Cargo', description: 'Prenda versátil', condition: 'Regular', points: 1, owners: [{ photo: null }] },
  { id: 4, name: 'Jersey de Lana', description: 'Acogedor y unisex', condition: 'Nuevo', points: 1, owners: [{ photo: null }, { photo: null }] },
]

const FILTER_MAP = {
  'Todos': () => true,
  'Nuevo': p => p.condition === 'Nuevo',
  'Buen estado': p => p.condition === 'Buen estado',
  'Regular': p => p.condition === 'Regular',
}

export const CatalogGrid = ({ filter }) => {
  const filterFn = FILTER_MAP[filter] || FILTER_MAP['Todos']
  const filtered = PRODUCTS.filter(filterFn)

  return (
    <div style={{ padding: '0 16px 120px' }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800 }}>Prendas disponibles</h2>
        <p style={{ margin: 0, fontSize: 13, color: '#aaa' }}>TEXTO RANDOM</p>
      </div>
      {filtered.length === 0
        ? <p style={{ textAlign: 'center', color: '#aaa', padding: 40 }}>No hay prendas con este filtro</p>
        : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
            {filtered.map(p => <CatalogCard key={p.id} {...p} />)}
          </div>
      }
    </div>
  )
}

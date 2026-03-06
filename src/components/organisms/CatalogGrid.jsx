import { useArticles } from '../../context/useArticles'
import { CatalogCard } from '../molecules/CatalogCard'

const FILTER_MAP = {
  'Todos': () => true,
  'Nuevo': p => p.condition === 'Nuevo',
  'Buen estado': p => p.condition === 'Buen estado',
  'Regular': p => p.condition === 'Regular',
}

export const CatalogGrid = ({ filter }) => {
  const { articles } = useArticles()
  const filterFn = FILTER_MAP[filter] || FILTER_MAP['Todos']
  const filtered = articles.filter(filterFn)

  return (
    <div style={{ padding: '0 16px 120px' }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800 }}>Prendas disponibles</h2>
        <p style={{ margin: 0, fontSize: 13, color: '#aaa' }}>Para Cris, Alex y todo el mundo</p>
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

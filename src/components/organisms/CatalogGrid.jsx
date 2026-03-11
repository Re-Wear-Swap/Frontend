import { useState, useEffect, useContext } from 'react'
import { ArticlesContext } from '../../context/ArticlesContext'
import { getArticles } from '../../services/articlesService'
import { CatalogCard } from '../molecules/CatalogCard'

const CATEGORY_MAP = {
  'Todas': null,
  'Camisetas': 'CAMISETAS',
  'Pantalones': 'PANTALONES',
  'Chaquetas': 'CHAQUETAS',
  'Vestidos': 'VESTIDOS',
  'Zapatos': 'ZAPATOS',
  'Accesorios': 'ACCESORIOS',
  'Otros': 'OTROS',
}

const CONDITION_MAP = {
  'Todos': null,
  'Nuevo': 'NUEVO',
  'Buen estado': 'USADO_BUEN_ESTADO',
  'Regular': 'USADO_REGULAR',
}

export const CatalogGrid = ({ filters = {} }) => {
  const { articles: allArticles } = useContext(ArticlesContext)
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(false)
  const { condition, category, startDate, endDate } = filters

  useEffect(() => {
    const categoryParam = CATEGORY_MAP[category] || null
    const hasBackendFilter = categoryParam || startDate || endDate

    if (hasBackendFilter) {
      setLoading(true)
      getArticles({ category: categoryParam, startDate, endDate })
        .then(data => {
          const conditionFilter = CONDITION_MAP[condition]
          const result = conditionFilter ? data.filter(a => a.itemCondition === conditionFilter) : data
          setFiltered(result.map(a => ({
            ...a,
            name: a.title,
            condition: a.itemCondition,
            image: a.imageUrl,
            status: a.articleStatus,
          })))
        })
        .catch(err => console.error('Error filtrando:', err))
        .finally(() => setLoading(false))
    } else {
      const conditionFilter = CONDITION_MAP[condition]
      setFiltered(conditionFilter ? allArticles.filter(a => a.condition === conditionFilter) : allArticles)
    }
  }, [condition, category, startDate, endDate, allArticles])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: 60, color: '#9333ea', fontSize: 16 }}>
      Cargando prendas...
    </div>
  )

  return (
    <div style={{ padding: '0 16px 120px' }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800 }}>Prendas disponibles</h2>
        <p style={{ margin: 0, fontSize: 13, color: '#aaa' }}>{filtered.length} prendas encontradas</p>
      </div>
      {filtered.length === 0
        ? <p style={{ textAlign: 'center', color: '#aaa', padding: 40 }}>No hay prendas con estos filtros</p>
        : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
            {filtered.map(p => <CatalogCard key={p.id} {...p} />)}
          </div>
      }
    </div>
  )
}

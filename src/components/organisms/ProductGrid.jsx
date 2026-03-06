import { useEffect, useState } from 'react'

import { ProductCard } from '../molecules/ProductCard.jsx'

import { getArticles } from "../../services/api";

export const ProductGrid = ({ onViewAll }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getArticles().then(articles => setProducts(articles || []))
  }, [])

  return (
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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 12
        }}
      >
        {products.map(p => (
          <ProductCard
            key={p.id}
            id={p.id}
            imageUrl={p.imageUrl}
            title={p.title}
            itemCondition={p.itemCondition}
            user={p.user}
          />
        ))}
      </div>
    </section>
  )
}

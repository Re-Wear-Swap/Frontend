import { useState } from 'react'
import { CatalogHeader } from '../molecules/CatalogHeader'
import { InfoBanner } from '../atoms/InfoBanner'
import { CatalogFilters } from '../organisms/CatalogFilters'
import { CatalogGrid } from '../organisms/CatalogGrid'
import { BottomNav } from '../organisms/BottomNav'

export function CatalogPage() {
  const [filter, setFilter] = useState('Todos')

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#f8f5ff', fontFamily: 'sans-serif' }}>
      <CatalogHeader
        onMenu={() => alert('Menu')}
        onSearch={() => alert('Buscar')}
      />
      <main style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ padding: '16px 0' }}>
          <InfoBanner text="1 prenda = 1 punto" />
        </div>
        <CatalogFilters onFilter={setFilter} />
        <CatalogGrid filter={filter} />
      </main>
      <button style={{
        position: 'fixed', bottom: 80, right: 20,
        background: '#9333ea', color: 'white', border: 'none',
        borderRadius: '50%', width: 52, height: 52,
        fontSize: 22, cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(147,51,234,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        ☰
      </button>
      <BottomNav active="catalogo" />
    </div>
  )
}

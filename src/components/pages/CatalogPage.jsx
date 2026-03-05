import { useState } from 'react'
import { HomeTemplate } from '../templates/HomeTemplate'
import { InfoBanner } from '../atoms/InfoBanner'
import { CatalogFilters } from '../organisms/CatalogFilters'
import { CatalogGrid } from '../organisms/CatalogGrid'

export function CatalogPage() {
  const [filter, setFilter] = useState('Todos')
  return (
    <HomeTemplate activeTab="catalogo">
      <div style={{ padding: '16px 0' }}>
        <InfoBanner text="1 prenda = 1 punto" />
      </div>
      <CatalogFilters onFilter={setFilter} />
      <CatalogGrid filter={filter} />
    </HomeTemplate>
  )
}

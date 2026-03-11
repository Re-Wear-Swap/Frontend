import { useState } from 'react'
import { HomeTemplate } from '../templates/HomeTemplate'
import { InfoBanner } from '../atoms/InfoBanner'
import { CatalogFilters } from '../organisms/CatalogFilters'
import { CatalogGrid } from '../organisms/CatalogGrid'

export function CatalogPage() {
  const [filters, setFilters] = useState({
    condition: 'Todos',
    category: 'Todas',
    startDate: '',
    endDate: '',
  })

  return (
    <HomeTemplate activeTab="catalogo">
      <div style={{ padding: '16px 0' }}>
        <InfoBanner text="1 prenda = 1 punto" />
      </div>
      <CatalogFilters onFilter={setFilters} />
      <CatalogGrid filters={filters} />
    </HomeTemplate>
  )
}

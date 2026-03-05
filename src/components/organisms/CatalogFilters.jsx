import { useState } from 'react'
import { FilterChip } from '../atoms/FilterChip'

const FILTERS = ['Todos', 'Nuevo', 'Buen estado', 'Regular']

export const CatalogFilters = ({ onFilter }) => {
  const [active, setActive] = useState('Todos')

  const handleClick = (f) => {
    setActive(f)
    onFilter(f)
  }

  return (
    <div style={{ display: 'flex', gap: 8, padding: '16px', overflowX: 'auto' }}>
      {FILTERS.map(f => (
        <FilterChip key={f} label={f} active={active === f} onClick={() => handleClick(f)} />
      ))}
    </div>
  )
}

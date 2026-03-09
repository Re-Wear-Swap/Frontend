import { useState } from 'react'
import { FilterChip } from '../atoms/FilterChip'

const FILTERS = ['Todos', 'Nuevo', 'Buen estado', 'Regular']

export const CatalogFilters = ({ onFilter, onDateFilter }) => {
  const [active, setActive] = useState('Todos')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const handleClick = (f) => {
    setActive(f)
    onFilter(f)
  }

  const handleDateChange = (newRange) => {
    setDateRange(newRange)
    if (onDateFilter) onDateFilter(newRange)
  }

  return (
    <div style={{ display: 'flex', gap: 8, padding: '16px', overflowX: 'auto' }}>
      
      {/* Chips */}
      {FILTERS.map(f => (
        <FilterChip 
          key={f} 
          label={f} 
          active={active === f} 
          onClick={() => handleClick(f)} 
        />
      ))}

      {/* Fecha inicio */}
      <input
        type="date"
        value={dateRange.start}
        onChange={(e) =>
          handleDateChange({ ...dateRange, start: e.target.value })
        }
        style={{ padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
      />

      {/* Fecha fin */}
      <input
        type="date"
        value={dateRange.end}
        onChange={(e) =>
          handleDateChange({ ...dateRange, end: e.target.value })
        }
        style={{ padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
      />

    </div>
  )
}

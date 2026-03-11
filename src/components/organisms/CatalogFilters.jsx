import { useState } from 'react'
import { FilterChip } from '../atoms/FilterChip'

const CONDITIONS = ['Todos', 'Nuevo', 'Buen estado', 'Regular']
const CATEGORIES = ['Todas', 'Camisetas', 'Pantalones', 'Chaquetas', 'Vestidos', 'Zapatos', 'Accesorios', 'Otros']

export const CatalogFilters = ({ onFilter }) => {
  const [condition, setCondition] = useState('Todos')
  const [category, setCategory] = useState('Todas')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleCondition = (f) => {
    setCondition(f)
    onFilter({ condition: f, category, startDate, endDate })
  }

  const handleCategory = (e) => {
    setCategory(e.target.value)
    onFilter({ condition, category: e.target.value, startDate, endDate })
  }

  const handleDate = (e) => {
    const { name, value } = e.target
    const newStart = name === 'startDate' ? value : startDate
    const newEnd = name === 'endDate' ? value : endDate
    if (name === 'startDate') setStartDate(value)
    if (name === 'endDate') setEndDate(value)
    onFilter({ condition, category, startDate: newStart, endDate: newEnd })
  }

  return (
    <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
        {CONDITIONS.map(f => (
          <FilterChip key={f} label={f} active={condition === f} onClick={() => handleCondition(f)} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <select
          value={category}
          onChange={handleCategory}
          style={{
            border: '1px solid #e9d5ff', borderRadius: 20, padding: '8px 16px',
            fontSize: 13, fontWeight: 600, color: '#9333ea',
            background: '#faf5ff', cursor: 'pointer', outline: 'none',
          }}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleDate}
          style={{
            border: '1px solid #e9d5ff', borderRadius: 20, padding: '8px 16px',
            fontSize: 13, color: '#9333ea', background: '#faf5ff', outline: 'none',
          }}
        />
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleDate}
          style={{
            border: '1px solid #e9d5ff', borderRadius: 20, padding: '8px 16px',
            fontSize: 13, color: '#9333ea', background: '#faf5ff', outline: 'none',
          }}
        />
      </div>
    </div>
  )
}

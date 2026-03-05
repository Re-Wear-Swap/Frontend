import { useTheme } from '../../context/useTheme'

export const SelectField = ({ label, name, value, onChange, options }) => {
  const { surface, text, border } = useTheme()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 700, color: text }}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          background: surface, color: text,
          border: `1px solid ${border}`,
          borderRadius: 12, padding: '12px 16px',
          fontSize: 14, outline: 'none', width: '100%', cursor: 'pointer',
        }}
      >
        <option value="">Selecciona una opción</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}
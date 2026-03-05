import { useTheme } from '../../context/useTheme'

export const TextAreaField = ({ label, name, value, onChange, placeholder }) => {
  const { surface, text, border } = useTheme()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 700, color: text }}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        style={{
          background: surface, color: text,
          border: `1px solid ${border}`,
          borderRadius: 12, padding: '12px 16px',
          fontSize: 14, outline: 'none', width: '100%',
          resize: 'vertical', fontFamily: 'sans-serif',
        }}
      />
    </div>
  )
}
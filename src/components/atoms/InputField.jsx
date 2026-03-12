import { useTheme } from '../../context/useTheme'

export const InputField = ({ label, name, value, onChange, placeholder, type = 'text' }) => {
    const { surface, text, border } = useTheme()
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: text }}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    background: surface, color: text,
                    border: `1px solid ${border}`,
                    borderRadius: 12, padding: '12px 16px',
                    fontSize: 14, outline: 'none', width: '100%',
                }}
            />
        </div>
    )
}
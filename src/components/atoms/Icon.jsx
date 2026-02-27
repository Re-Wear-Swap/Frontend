export const Icon = ({ name }) => {
  const icons = {
    home: '🏠', explore: '🧭', points: '⭕', profile: '👤'
  }
  return <span style={{ fontSize: 22 }}>{icons[name]}</span>
}
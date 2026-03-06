export const Icon = ({ name }) => {
  const icons = {
    home: '🏠', catalog: '👗', points: '⭕', profile: '👤'
  }
  return <span style={{ fontSize: 22 }}>{icons[name]}</span>
}
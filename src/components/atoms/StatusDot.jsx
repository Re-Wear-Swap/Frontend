export const StatusDot = ({ status }) => {
  const colors = { nuevo: '#22c55e', bueno: '#3b82f6', usado: '#eab308' };
  return (
    <span className="status-dot" style={{ background: colors[status] }} />
  );
};
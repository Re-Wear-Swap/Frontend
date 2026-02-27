export const Badge = ({label, variant = 'purple'}) => {
    <span className = {`badge badge--${variant}`}>{label}</span>
};
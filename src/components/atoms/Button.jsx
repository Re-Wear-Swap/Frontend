export const Button = ({ children, variant = 'primary', onClick }) => (
  <button className={`btn btn--${variant}`} onClick={onClick}>
    {children}
  </button>
);
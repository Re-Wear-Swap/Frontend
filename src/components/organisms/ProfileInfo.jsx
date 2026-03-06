import { useNavigate } from "react-router-dom";

export function ProfileInfo({ user }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ fontWeight: 800, fontSize: 24 }}>
        ¡Hola, {user.name}!
      </h2>

      <p style={{ marginTop: 4 }}>
        @{user.username || "usuario_rewear"}
      </p>

      <p style={{ marginTop: 8 }}>
        Puntos: <strong>{user.points}</strong>
      </p>

      <button
        onClick={() => navigate("/newarticle")}
        style={{
          marginTop: 16,
          padding: "12px 20px",
          backgroundColor: "#9333ea",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Subir prenda
      </button>
    </div>
  );
}

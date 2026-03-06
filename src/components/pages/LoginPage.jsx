import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { HomeTemplate } from "../templates/HomeTemplate";

export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await loginUser(form.name, form.email);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/profile");
  };

  return (
    <HomeTemplate activeTab="perfil">
      <div style={{ padding: 24 }}>
        <h1 style={{ fontWeight: 800, fontSize: 28 }}>Iniciar sesión</h1>

        <form onSubmit={handleSubmit} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            required
          />

          <button
            type="submit"
            style={{
              padding: "12px 20px",
              backgroundColor: "#9333ea",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </HomeTemplate>
  );
}

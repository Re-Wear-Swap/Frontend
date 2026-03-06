import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/api";
import { HomeTemplate } from "../templates/HomeTemplate";

export function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    isAdult: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await createUser(form);
    localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/profile");
  };

  return (
    <HomeTemplate activeTab="perfil">
      <div style={{ padding: 24 }}>
        <h1 style={{ fontWeight: 800, fontSize: 28 }}>¡Hola, Usuari@!</h1>
        <h2 style={{ marginTop: 4, fontSize: 20 }}>¡Bienvenid@!</h2>

        <p style={{ marginTop: 12 }}>
          Únete a la revolución de la moda. <br />
          <strong>1 Prenda = 1 punto</strong>
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>

          <div>
            <label style={{ fontWeight: 600 }}>Nombre de usuari@</label>
            <input
              type="text"
              name="name"
              placeholder="tuEj: usuari@_vanguardia"
              value={form.name}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              required
            />
          </div>

          <div>
            <label style={{ fontWeight: 600 }}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="tu@correo.com"
              value={form.email}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              required
            />
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              name="isAdult"
              checked={form.isAdult}
              onChange={handleChange}
              required
            />
            Confirmo que soy mayor de edad para participar en el trueque.
          </label>

          <button
            type="submit"
            style={{
              marginTop: 12,
              padding: "12px 20px",
              backgroundColor: "#9333ea",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Registrarse
          </button>
        </form>

        <p style={{ marginTop: 16 }}>
          ¿Ya eres parte del club?{" "}
          <span
            style={{ color: "#9333ea", fontWeight: 600, cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Inicia sesión.
          </span>
        </p>
      </div>
    </HomeTemplate>
  );
}

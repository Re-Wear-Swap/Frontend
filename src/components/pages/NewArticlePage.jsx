import { useState } from "react";
import { HomeTemplate } from "../templates/HomeTemplate";
import { createArticle } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function NewArticlePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    itemCondition: "",
    articleStatus: "DISPONIBLE",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createArticle({
      title: form.title,
      description: form.description,
      imageUrl: form.imageUrl,
      category: form.category,
      itemCondition: form.itemCondition,   // ✔ CORRECTO
      articleStatus: form.articleStatus,   // ✔ CORRECTO
      user: { id: user.id },
    });

    navigate("/profile");
  };

  return (
    <HomeTemplate activeTab="perfil">
      <form
        onSubmit={handleSubmit}
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <h2>Únete a la revolución de la moda</h2>

        <label>Título</label>
        <input name="title" value={form.title} onChange={handleChange} />

        <label>Descripción</label>
        <textarea name="description" value={form.description} onChange={handleChange} />

        <label>Categoría</label>
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Selecciona una categoría</option>
          <option value="CAMISETAS">Camisetas</option>
          <option value="PANTALONES">Pantalones</option>
          <option value="CHAQUETAS">Chaquetas</option>
          <option value="VESTIDOS">Vestidos</option>
          <option value="ZAPATOS">Zapatos</option>
          <option value="ACCESORIOS">Accesorios</option>
          <option value="OTROS">Otros</option>
        </select>

        <label>Estado del artículo</label>
        <select name="itemCondition" value={form.itemCondition} onChange={handleChange}>
          <option value="">Selecciona un estado</option>
          <option value="NUEVO">Nuevo</option>
          <option value="USADO_BUEN_ESTADO">Usado - Buen estado</option>
          <option value="USADO_REGULAR">Usado - Regular</option>
        </select>

        <label>Disponibilidad</label>
        <select name="articleStatus" value={form.articleStatus} onChange={handleChange}>
          <option value="DISPONIBLE">Disponible</option>
          <option value="RESERVADO">Reservado</option>
          <option value="INTERCAMBIADO">Intercambiado</option>
        </select>

        <label>Imagen (URL)</label>
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />

        <button type="submit" style={{ padding: 12, background: "#9333ea", color: "white" }}>
          Subir prenda
        </button>
      </form>
    </HomeTemplate>
  );
}

import { useEffect, useState } from "react";
import { getArticles, deleteArticle } from "../../services/api";
import { ProductCard } from "../molecules/ProductCard.jsx";

export const ProfileTabs = ({ userId }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((allArticles) => {
      const filtered = allArticles.filter(a => a.user?.id === userId);
      setArticles(filtered);
    });
  }, [userId]);

  const handleDelete = async (id) => {
    await deleteArticle(id);
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>
        Mis Artículos
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
        }}
      >
        {articles.map((a) => (
          <div key={a.id} style={{ position: "relative" }}>
            <ProductCard
              id={a.id}
              imageUrl={a.imageUrl}
              title={a.title}
              itemCondition={a.itemCondition}
              user={a.user}
            />

            <button
              onClick={() => handleDelete(a.id)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "red",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "4px 8px",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

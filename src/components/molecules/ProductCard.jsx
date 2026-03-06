import { useState } from "react";

export const ProductCard = ({ id, imageUrl, title, itemCondition, user }) => {
  const [isFav, setIsFav] = useState(false);
  const points = user?.points ?? 1;

  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        position: "relative",
      }}
    >
      <button
        onClick={() => setIsFav((prev) => !prev)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          background: "white",
          border: "none",
          borderRadius: "50%",
          width: 32,
          height: 32,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          fontSize: 16,
        }}
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      <div style={{ position: "relative", background: "#f3f3f3", height: 180 }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            onError={(e) => {
              e.target.src = "https://i.imgur.com/4AiXzf8.jpeg"; // fallback seguro
            }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
            }}
          >
            👕
          </div>
        )}

        <span
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "#9333ea",
            color: "white",
            borderRadius: 20,
            padding: "3px 8px",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {points} PUNTO
        </span>
      </div>

      <div style={{ padding: "10px 12px 14px" }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700 }}>
          {title}
        </h3>
        <p style={{ margin: 0, fontSize: 12, color: "#888" }}>
          {itemCondition}
        </p>
      </div>
    </div>
  );
};

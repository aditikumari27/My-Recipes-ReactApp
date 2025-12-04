import React from "react";

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ position: "relative" }}>
          {recipe.image && (
            <img
              src={recipe.image}
              alt="recipe"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                marginBottom: "20px"
              }}
            />
          )}
          
          <h2 style={{ fontSize: "2rem", marginBottom: "5px", color: "#d63031" }}>{recipe.title}</h2>
          <span style={{ background: "#ff7675", color: "white", padding: "5px 12px", borderRadius: "15px", fontSize: "0.9rem" }}>
            {recipe.category}
          </span>

          <div style={{ marginTop: "25px" }}>
            <h3 style={{ borderBottom: "2px solid #fab1a0", paddingBottom: "5px" }}>Ingredients</h3>
            <ul style={{ lineHeight: "1.8", color: "#555" }}>
              {recipe.ingredients.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "25px" }}>
            <h3 style={{ borderBottom: "2px solid #fab1a0", paddingBottom: "5px" }}>Instructions</h3>
            <ol style={{ lineHeight: "1.8", color: "#555" }}>
              {recipe.steps.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ol>
          </div>

          <button
            onClick={onClose}
            style={{ 
              marginTop: "20px", 
              width: "100%", 
              background: "#2d3436", 
              color: "white",
              padding: "15px"
            }}
          >
            Close Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
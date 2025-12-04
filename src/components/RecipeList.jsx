import React from "react";

export default function RecipeList({ recipes, onView, onEdit, onDelete }) {
  if (recipes.length === 0)
    return (
      <div style={{ textAlign: "center", color: "white", marginTop: "50px" }}>
        <h2 style={{ color: "#fff" }}>Your box is empty!</h2>
        <p>Start adding some delicious recipes above.</p>
      </div>
    );

  return (
    <div className="recipe-grid">
      {recipes.map((r) => (
        <div key={r.id} className="card recipe-item">
          <div className="recipe-thumb">
            {r.image ? (
              <img src={r.image} alt={r.title} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#eee', color: '#aaa' }}>
                No Image
              </div>
            )}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: "5px" }}>{r.title}</h3>
            <span style={{ 
              background: "#dfe6e9", 
              color: "#636e72", 
              padding: "4px 8px", 
              borderRadius: "20px", 
              fontSize: "12px", 
              alignSelf: "start",
              marginBottom: "15px"
            }}>
              {r.category}
            </span>

            <div style={{ marginTop: "auto", display: "flex", gap: "8px" }}>
              <button className="action-btn btn-view" onClick={() => onView(r)}>View</button>
              <button className="action-btn btn-edit" onClick={() => onEdit(r)}>Edit</button>
              <button className="action-btn btn-delete" onClick={() => onDelete(r.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
import React, { useState, useEffect } from "react";
import RecipeForm from "./components/RecipeForm.jsx";
import RecipeList from "./components/RecipeList.jsx";
import RecipeModal from "./components/RecipeModal.jsx";
import { loadRecipes, saveRecipes } from "./utils/storage.js";

export default function App() {
  const [recipes, setRecipes] = useState(loadRecipes());
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  function handleAdd(recipe) {
    if (editing) {
      setRecipes(recipes.map((r) => (r.id === recipe.id ? recipe : r)));
      setEditing(null);
    } else {
      setRecipes([recipe, ...recipes]);
    }
  }

  function handleDelete(id) {
    if (confirm("Are you sure you want to delete this recipe?")) {
      setRecipes(recipes.filter((r) => r.id !== id));
    }
  }

  function handleEdit(recipe) {
    setEditing(recipe);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Generate random flying food background
  const flyingObjects = [
    { icon: "🍕", left: "10%", delay: "0s" },
    { icon: "🥗", left: "30%", delay: "5s" },
    { icon: "🍔", left: "70%", delay: "2s" },
    { icon: "🍰", left: "50%", delay: "8s" },
    { icon: "🥑", left: "85%", delay: "12s" },
    { icon: "🍩", left: "20%", delay: "15s" },
    { icon: "🍎", left: "60%", delay: "3s" },
    { icon: "🥪", left: "90%", delay: "9s" },
  ];

  return (
    <>
      {/* Background Animation Layer */}
      <div className="bg-animation">
        {flyingObjects.map((obj, i) => (
          <span 
            key={i} 
            className="floating-item" 
            style={{ left: obj.left, animationDelay: obj.delay }}
          >
            {obj.icon}
          </span>
        ))}
      </div>

      <div className="container">
        <h1 style={{ 
          textAlign: "center", 
          color: "white", 
          fontSize: "3rem", 
          marginBottom: "30px", 
          textShadow: "0 5px 15px rgba(0,0,0,0.3)" 
        }}>
          👨‍🍳 MasterChef Box
        </h1>
        
        <RecipeForm onAdd={handleAdd} initial={editing} />

        <div style={{ marginTop: "40px" }}>
          <RecipeList
            recipes={recipes}
            onView={(r) => setSelected(r)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <RecipeModal recipe={selected} onClose={() => setSelected(null)} />
      </div>
    </>
  );
}
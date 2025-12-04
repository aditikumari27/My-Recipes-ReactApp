import React, { useState, useEffect } from "react";

export default function RecipeForm({ onAdd, initial }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setCategory(initial.category);
      setIngredients(initial.ingredients.join("\n"));
      setSteps(initial.steps.join("\n"));
      setImage(initial.image);
    }
  }, [initial]);

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Please add a title!");

    const recipe = {
      id: initial ? initial.id : Date.now(),
      title,
      category,
      ingredients: ingredients.split("\n").filter((v) => v.trim()),
      steps: steps.split("\n").filter((v) => v.trim()),
      image,
    };

    onAdd(recipe);
    if (!initial) {
      setTitle("");
      setIngredients("");
      setSteps("");
      setImage(null);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 style={{ textAlign: "center", textTransform: "uppercase", letterSpacing: "2px" }}>
        {initial ? "Edit Recipe" : "✨ Create New Recipe"}
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div>
          <label>Recipe Name</label>
          <input 
            placeholder="e.g., Spicy Tacos" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Breakfast 🍳</option>
            <option>Lunch 🍔</option>
            <option>Dinner 🍝</option>
            <option>Snack 🍿</option>
            <option>Dessert 🍰</option>
          </select>
        </div>
      </div>

      <label>Ingredients (Line separated)</label>
      <textarea 
        rows={3} 
        placeholder="- 2 Eggs&#10;- 1 Cup Flour" 
        value={ingredients} 
        onChange={(e) => setIngredients(e.target.value)} 
      />

      <label>Steps (Line separated)</label>
      <textarea 
        rows={3} 
        placeholder="1. Mix bowl&#10;2. Bake at 350" 
        value={steps} 
        onChange={(e) => setSteps(e.target.value)} 
      />

      <label>Cover Image</label>
      <input type="file" accept="image/*" onChange={handleImage} />
      
      {image && (
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <img src={image} alt="Preview" style={{ maxWidth: "100%", height: "150px", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }} />
        </div>
      )}

      <button type="submit" className="btn-primary">
        {initial ? "Update Recipe" : "Add to Box"}
      </button>
    </form>
  );
}
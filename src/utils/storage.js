const KEY = "ultra-recipe-storage";

export function loadRecipes() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error loading recipes:", err);
    return [];
  }
}

export function saveRecipes(recipes) {
  try {
    localStorage.setItem(KEY, JSON.stringify(recipes));
  } catch (err) {
    console.error("Error saving recipes:", err);
  }
}
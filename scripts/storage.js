// storage.js

export function loadTodos() {
  try {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Error loading todos:", e);
    return [];
  }
}

export function saveTodos(todos) {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (e) {
    console.error("Error saving todos:", e);
  }
}

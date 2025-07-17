// storage.js

// Save todos array to localStorage
export function saveTodos(todos) {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos to localStorage:", error);
  }
}

// Load todos
export function loadTodos() {
  try {
    const todosStr = localStorage.getItem("todos");
    if (!todosStr) return [];
    return JSON.parse(todosStr);
  } catch (error) {
    console.error("Error loading todos from localStorage:", error);
    return [];
  }
}

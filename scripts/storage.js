// storage.js

// Save todos array to localStorage
// ذخیره آرایه تو‌دوها به صورت JSON در localStorage
export function saveTodos(todos) {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos to localStorage:", error);
  }
}

// بارگذاری آرایه تو‌دوها از localStorage
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


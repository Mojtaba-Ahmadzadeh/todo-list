import { saveTodos } from "./storage.js";
import { renderTodos } from "./ui.js";

export let todos = [];

// Add a new todo item and update storage & UI
export function addTodo(text, difficulty, color, description = "") {
  const newTodo = {
    id: crypto.randomUUID(),
    text,
    description,
    difficulty,
    color,
    completed: false,
    deleted: false,
  };

  todos.push(newTodo);
  saveTodos(todos);
  renderTodos();
}

// Replace the entire todos array (used on load)
export function setTodos(newTodos) {
  todos = newTodos;
}

// Toggle the completion status of a todo by its ID
export function toggleCompletedById(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  saveTodos(todos);
  renderTodos();
}

// Mark a todo as deleted (soft delete)
export function deleteTodoById(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo || todo.deleted) return;
  todo.deleted = true;
  saveTodos(todos);
}

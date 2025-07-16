import { saveTodos } from "./storage.js";
import { renderTodos } from "./ui.js";

export let todos = [];

// افزودن تسک جدید به آرایه و ذخیره در localStorage
export function addTodo(text, difficulty, color) {
  todos.push({ text, difficulty, color, completed: false });
  saveTodos(todos);
  renderTodos();
}

// جایگزینی کل آرایه تسک‌ها
export function setTodos(newTodos) {
  todos = newTodos;
}

// تغییر وضعیت انجام شده تسک
export function toggleCompleted(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos(todos);
  renderTodos();
}

// حذف تسک
export function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos(todos);
  renderTodos();
}